export function resolve(specifier, context, nextResolve) {
  return specifier === 'esbuild'
    ? { url: new URL('./esbuild-exports.mjs', import.meta.url).href, shortCircuit: true }
    : nextResolve(specifier, context);
}
