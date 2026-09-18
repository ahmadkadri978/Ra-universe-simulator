import { installWasmEsbuild } from './esbuild-wasm-runtime.mjs';
const api = await installWasmEsbuild();
export const { build, context, transform, formatMessages, analyzeMetafile, initialize, stop, version } = api;
export default api;
