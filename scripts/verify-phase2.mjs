import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const required = [
  'src/visual/scenes/ContinuousUniverseScene.tsx',
  'src/visual/navigation/CinematicCameraRig.tsx',
  'src/visual/navigation/universeGraph.ts',
  'src/visual/navigation/navigationLogic.ts',
  'src/visual/navigation/useUniverseNavigation.ts',
  'src/visual/effects/UniverseSpine.tsx',
  'src/visual/scales/InfinityScale.tsx',
  'src/visual/scales/LogosScale.tsx',
  'src/visual/scales/GalaxyScale.tsx',
  'src/visual/scales/StarScale.tsx',
  'src/visual/scales/PlanetScale.tsx',
  'src/visual/scales/CivilizationScale.tsx',
  'src/visual/scales/EntityScale.tsx',
  'src/visual/scales/EnergyScale.tsx',
  'src/visual/scales/InnerScale.tsx',
  'src/ui/phase2/UniverseHUD.tsx',
  'docs/PHASE_2_REPORT.md',
];
for (const entry of required) await access(path.join(root, entry));

const app = await readFile(path.join(root, 'src/app/App.tsx'), 'utf8');
if (!app.includes('ContinuousUniverseScene')) throw new Error('Phase 2 scene is not wired into App.');
if (app.includes('FoundationScene')) throw new Error('Phase 1 FoundationScene is still wired as the primary application scene.');

const scene = await readFile(path.join(root, 'src/visual/scenes/ContinuousUniverseScene.tsx'), 'utf8');
for (const scale of ['InfinityScale','LogosScale','GalaxyScale','StarScale','PlanetScale','CivilizationScale','EntityScale','EnergyScale','InnerScale']) {
  if (!scene.includes(scale)) throw new Error(`Continuous scene is missing ${scale}.`);
}

const graph = await readFile(path.join(root, 'src/visual/navigation/universeGraph.ts'), 'utf8');
if (!graph.includes("representationClass: 'SIMULATION_ABSTRACTION'")) {
  throw new Error('Phase 2 scale geometry classification is missing.');
}

console.log('Phase 2 structural verification passed.');
