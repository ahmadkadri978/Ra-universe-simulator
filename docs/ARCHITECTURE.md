# Production Architecture — Phases 2 and 3

## Goal

Maintain the Phase 1 separation of ontology/simulation from presentation while adding a continuous high-fidelity 3D navigation layer.

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
       ┌──────┴─────────────┐
       v                    v
  visual navigation      visual scales
       │                    │
       └────────┬───────────┘
                v
                UI
                │
                v
                app
```

The critical rule remains: **domain and simulation do not depend on React, Three.js, UI components, or WebGL**.

## Layers

### `src/domain`
Pure TypeScript ontology and state definitions. No rendering framework is allowed here.

### `src/sources`
Machine-readable evidence records and selectors. Independent of visual representation.

### `src/simulation`
Deterministic reducer, rules, engine, state, and events. Simulator-only numeric mechanics live here.

### `src/simulation/store`
Zustand adapter connecting the pure engine to React.

### `src/visual/navigation`
Phase 2 introduces a dedicated navigation sub-layer:

- universe scale graph
- pure navigation transitions
- Zustand navigation adapter
- cinematic camera rig

The pure graph/transition files are separately compilable and testable without React.

### `src/visual/scales`
One visual grammar per continuous scale. These components represent ontology but do not own ontology rules.

### `src/visual/effects`
Cross-scale visual connectors such as the continuous world spine.

### `src/visual/components`
Reusable rendering primitives: glow spheres, flowing arcs, fragmented rings, coherent shells, labels.

### `src/ui/phase2`
HUD and scale navigation interface. It may command navigation but does not mutate ontology rules.

### `src/app`
Composition root. It wires simulation selection, continuous world rendering, source inspector, and the navigation HUD.

## Continuous World Model

The Phase 2 world uses a conceptual world spine rather than literal astrophysical distances. Scale anchors are deliberately close enough for a cinematic camera to travel between them while preserving spatial continuity.

This is a **visualization abstraction**.

The scale graph is:

```text
Infinity
  ↓
Logos
  ↓
Galaxy
  ↓
Star
  ↓
Planet
  ↓
Civilization
  ↓
Entity
  ↓
Energy Centers
  ↓
Inner Consciousness
```

Each scale maps back to an ontology concept for Source Inspector integration.

## Rendering Principle

The visual system uses geometry to teach differences, not merely recolor them.

Examples:

- Infinity: distributed symmetry / latent potential
- Logos: convergent focus and ordered relationships
- Galaxy: spiral organization
- Planet: collective and density structures
- D3: fragmented teaching metaphor
- D6: coherent teaching metaphor
- Civilization: separate nodes with relational links
- Entity: localized integrated locus
- Energy: readable center flow
- Inner: branching relational topology

None of those shapes are automatically promoted to source-backed claims.

## Navigation State vs Simulation State

Two stores intentionally exist:

- simulation store: ontology/simulation state
- universe navigation store: camera focus/history/scale position

This prevents camera movement from becoming simulation doctrine and makes future Guided Journey playback easier.

## Legacy Preservation

The previous standalone visual prototype remains at:

`public/legacy-phase4-preview.html`

It is reference material only; the production entry point is the React application.

## Phase 3 model and boundaries

`JourneyAction → simulationReducer → journeyReducer → SimulationState`.
The incarnation reducer controls lifecycle transitions; invalid transitions return the original state. Legacy phase events delegate to the same guards. Higher Self guidance returns only a HigherSelfState, with no ability to mutate the entity, events, or graph.

Domain types include IncarnationProgram, IncarnationState, CatalystEvent, ChoiceEvent, LifeEvent, PossibilityNode, PossibilityGraph, LifeReview, TimeSpaceState, and PerspectiveMode. Authored event/graph/review data has explicit abstraction classification.

The reusable possibility engine changes emphasis and adds linked children only after an explicit response. Deterministic replay means the same seed and actions produce the same record; it does not determine future choices.

## Phase 3 spatial integration

The nine-scale graph is unchanged. Five anchors extend Inner Consciousness. A persistent JourneyWorld interpolates between anchors while the camera travels. The same event nodes reshape from chronological positions into a relational lattice. Higher Self adds an information atlas.

Navigation stores view, selected object, perspective, and past/future snapshots independently of the model. App synchronizes restored viewing context without replaying life actions. Back/forward restores viewing context, not earlier life-state versions.

## Rendering budget

Only the current Phase 2 scale and its neighbors mount. Phase 3 detail mounts on entry. The event geometry is bounded, spline paths and procedural buffers are memoized, and flow particles are limited. DPR caps are 1.6 desktop / 1.25 compact. Optional desktop bloom runs at DPR 1. Reduced motion suppresses decorative movement and shortens travel. Full appropriate-lens records remain in text.

## Tooling

Vite 6.4.3, Vitest 4.1.11, and the React Vite plugin are locked to verified versions. The launcher selects native esbuild or an in-process WASM fallback when subprocess pipes are denied. The fallback redirects compiler module resolution, uses a private filesystem facade, and writes normal compiler output. It is not included in browser bundles.
