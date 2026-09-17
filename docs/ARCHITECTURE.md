# Production Architecture — Phase 2

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
