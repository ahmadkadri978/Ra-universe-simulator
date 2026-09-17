import { access, readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const requiredDirectories = [
  'src/domain',
  'src/simulation/engine',
  'src/simulation/rules',
  'src/simulation/state',
  'src/simulation/store',
  'src/sources',
  'src/visual/scenes',
  'src/ui',
  'docs',
  'public',
];

const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'src/app/main.tsx',
  'src/domain/ontology/concepts.ts',
  'src/simulation/engine/reducer.ts',
  'src/sources/catalog.ts',
  'docs/SIMULATION_CONSTITUTION.md',
  'docs/SOURCE_METHODOLOGY.md',
];

for (const entry of [...requiredDirectories, ...requiredFiles]) {
  await access(path.join(root, entry));
}

const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
for (const dependency of ['react', 'react-dom', '@react-three/fiber', 'three', 'zustand', 'vite', 'typescript']) {
  const exists = packageJson.dependencies?.[dependency] || packageJson.devDependencies?.[dependency];
  if (!exists) throw new Error(`Missing required dependency declaration: ${dependency}`);
}

const walk = async (directory) => {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry);
    const info = await stat(full);
    if (info.isDirectory()) files.push(...await walk(full));
    else if (/\.(ts|tsx)$/.test(entry)) files.push(full);
  }
  return files;
};

const sourceFiles = await walk(path.join(root, 'src'));
const importPattern = /(?:from\s+|import\s*)['"]([^'"]+)['"]/g;

for (const file of sourceFiles) {
  const text = await readFile(file, 'utf8');
  const relativePath = path.relative(root, file);

  // Pure layers may not depend on presentation frameworks.
  if (
    relativePath.startsWith('src/domain/') ||
    relativePath.startsWith('src/sources/') ||
    relativePath.startsWith('src/simulation/engine/') ||
    relativePath.startsWith('src/simulation/events/') ||
    relativePath.startsWith('src/simulation/rules/') ||
    relativePath.startsWith('src/simulation/state/') ||
    relativePath.startsWith('src/simulation/utils/')
  ) {
    if (/from\s+['"](?:react|three|@react-three|zustand)/.test(text)) {
      throw new Error(`Presentation dependency leaked into pure layer: ${relativePath}`);
    }
  }

  let match;
  while ((match = importPattern.exec(text)) !== null) {
    const specifier = match[1];
    if (!specifier?.startsWith('.')) continue;

    const resolved = path.resolve(path.dirname(file), specifier);
    const candidates = specifier.endsWith('.js')
      ? [resolved.replace(/\.js$/, '.ts'), resolved.replace(/\.js$/, '.tsx')]
      : [resolved, `${resolved}.ts`, `${resolved}.tsx`, path.join(resolved, 'index.ts'), path.join(resolved, 'index.tsx')];

    let found = false;
    for (const candidate of candidates) {
      try {
        await access(candidate);
        found = true;
        break;
      } catch {
        // try next candidate
      }
    }
    if (!found) throw new Error(`Broken relative import in ${relativePath}: ${specifier}`);
  }
}

const rules = await readdir(path.join(root, 'src/simulation/rules'));
if (rules.filter((name) => name.endsWith('.ts') && !name.endsWith('.test.ts')).length < 3) {
  throw new Error('Simulation rules layer is unexpectedly thin.');
}

const legacy = await readFile(path.join(root, 'public/legacy-phase4-preview.html'), 'utf8');
if (!legacy.includes('<canvas') && !legacy.toLowerCase().includes('webgl')) {
  throw new Error('Legacy visual preview was not preserved correctly.');
}

console.log(`Architecture verification passed across ${sourceFiles.length} TypeScript source files.`);
console.log('Layer boundaries, internal imports, dependency declarations, docs, and legacy preview are valid.');
