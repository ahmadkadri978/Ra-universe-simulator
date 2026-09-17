# Phase 1 Production Architecture

## Goal

Replace the former single-file prototype architecture with clear technical boundaries before adding more simulation complexity.

## Dependency Direction

```text
sources ───────────────┐
                      │
domain ───────┐        │
              v        v
         simulation engine
              │
              v
            store
              │
       ┌──────┴──────┐
       v             v
      visual          UI
       └──────┬──────┘
              v
              app
```

The critical rule is that **domain and simulation do not depend on React, Three.js, UI components, or WebGL**.

## Layers

### `src/domain`
Pure TypeScript ontology and state definitions. No rendering framework is allowed here.

### `src/sources`
Machine-readable evidence records and selectors. This layer is independent of the visual representation.

### `src/simulation`
Deterministic reducer, rules, engine, state, and events. Numeric simulator-only values are intentionally isolated here.

### `src/simulation/store`
Zustand adapter. This connects the pure engine to React without making Zustand part of the domain model.

### `src/visual`
React Three Fiber / Three.js representation. Phase 1 includes only a restrained architecture scene because the major rendering rewrite belongs to Phase 2.

### `src/ui`
Source inspector, evidence badges, metrics, and later navigation systems.

### `src/app`
Composition root. It wires the simulation store, visual scene, and UI together.

## Determinism

Randomness must be seeded through `createDeterministicRandom`. This allows reproducible simulations, debugging, future snapshots, and tests.

## Events

State mutation occurs through typed `SimulationEvent` values. This prevents UI components from directly mutating domain state and makes future replay/recording possible.

## Legacy Preservation

The previous Phase 4 standalone visual prototype is preserved at:

`public/legacy-phase4-preview.html`

and the root `preview.html` remains directly openable. This avoids visual regression while the production architecture is being built.
