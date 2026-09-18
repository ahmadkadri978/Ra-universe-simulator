import { createRequire, register } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const tool = process.argv[2];
if (!['vite', 'vitest'].includes(tool)) throw new Error('Expected vite or vitest.');
{
  const native = require('esbuild');
  try {
    await native.transform('const ready = true', { loader: 'js' });
  } catch (error) {
    if (!/spawn (?:EPERM|EACCES)/.test(String(error))) throw error;
    register('./esbuild-loader.mjs', import.meta.url);
    process.env.RA_IN_PROCESS_COMPILER = '1';
    console.info('Using the in-process WebAssembly compiler on this host.');
  }
}
const entry = path.join(path.dirname(require.resolve(tool + '/package.json')), tool === 'vite' ? 'bin/vite.js' : 'vitest.mjs');
process.argv = [process.argv[0], entry, ...process.argv.slice(3)];
await import(pathToFileURL(entry).href);
