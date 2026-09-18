import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import esbuild from 'esbuild-wasm/lib/browser.js';
// In-process fallback for hosts that cannot create subprocess pipes.
// The native filesystem is read through a private facade; Node's fs is never patched.
export async function installWasmEsbuild() {
const scope = {};
for (const key of Object.getOwnPropertyNames(globalThis)) {
  if (!['fs', 'self', 'process'].includes(key) && !key.startsWith('_')) {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, key);
    if (descriptor && 'value' in descriptor) scope[key] = descriptor.value;
  }
}
const facade = { ...fs };
let stdinReader;
Object.defineProperty(facade, 'read', {
  get: () => (fd, ...args) => fd === 0 ? stdinReader(fd, ...args) : fs.read(fd, ...args),
  set: value => { stdinReader = value; },
});
facade.write = (fd, buffer, offset, length, position, callback) => {
  if (fd === 1 || fd === 2) {
    facade.writeSync(fd, buffer.subarray(offset, offset + length));
    callback(null, length, buffer);
  } else fs.write(fd, buffer, offset, length, position, callback);
};
scope.fs = facade;
scope.process = { ...process, cwd: () => process.cwd() };
scope.crypto = globalThis.crypto;
scope.performance = globalThis.performance;
globalThis.self = scope;
await esbuild.initialize({ wasmModule: await WebAssembly.compile(fs.readFileSync('node_modules/esbuild-wasm/esbuild.wasm')), worker: false });
const writeOutputs = result => {
  for (const output of result.outputFiles ?? []) {
    fs.mkdirSync(path.dirname(output.path), { recursive: true });
    fs.writeFileSync(output.path, output.contents);
  }
};
const optionsFor = options => {
  if (options.write === false) return options;
  return { ...options, write: false, plugins: [...(options.plugins ?? []), {
    name: 'local-output-files',
    setup(build) { build.onEnd(result => { if (!result.errors.length) writeOutputs(result); }); },
  }] };
};
const adapter = { ...esbuild,
  build: options => esbuild.build(optionsFor(options)),
  context: options => esbuild.context(optionsFor(options)),
};
const require = createRequire(import.meta.url);
require('esbuild');
require.cache[require.resolve('esbuild')].exports = adapter;
return adapter;
}
