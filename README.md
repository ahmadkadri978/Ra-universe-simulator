# The Law of One Ontology Simulator

Phase 1 converts the project from a large standalone prototype into a modular production foundation.

The project models the ontology described in *The Ra Contact / Law of One* as an interactive system. It distinguishes source-backed material from inference and simulator-only abstractions.

## Current Phase

**Phase 1 — Production Architecture Foundation**

This phase prioritizes architecture, deterministic simulation state, source traceability, and testability. The visually richer Phase 4 prototype is preserved while the production codebase is prepared for Phase 2's continuous-universe rewrite.

## Stack

- React 18
- TypeScript
- Vite
- React Three Fiber
- Three.js
- @react-three/drei
- Zustand
- Vitest

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Tests:

```bash
npm test
```

Architecture/domain verification that does not require the frontend dependencies:

```bash
npm run verify:phase1
```

## Folder Structure

```text
src/
  app/                  composition root and global styling
  domain/
    ontology/           canonical concept graph
    densities/          density definitions
    entities/           entity state
    energyCenters/      red-violet ray model
    polarity/           STO / STS state types
    incarnation/        incarnation planning and phase model
    higherSelf/         probability-branch model
    socialMemory/       collective-state model
  simulation/
    engine/             pure reducer and SimulationEngine
    events/             typed state transitions
    rules/              catalyst, polarity, harvest rules
    state/              initial and runtime state
    store/              Zustand adapter
    utils/              deterministic RNG and math
  sources/              source catalog, evidence classes, selectors
  visual/               React Three Fiber boundary
  ui/                   Source Inspector and simulation HUD
  audio/                reserved for Phase 7

docs/
  ARCHITECTURE.md
  SIMULATION_CONSTITUTION.md
  SOURCE_METHODOLOGY.md
  ADR-001-DOMAIN-SEPARATION.md
  PHASE_1_REPORT.md
public/
  legacy-phase4-preview.html
```

## Architectural Rule

The dependency direction is intentional:

**source/domain → simulation → store → visual/UI → app**

Simulation rules must never be embedded inside shaders or React components.

## Source Classification

Every meaningful concept or mechanic belongs to one of:

- `SOURCE_BACKED`
- `INFERRED`
- `SIMULATION_ABSTRACTION`

See `docs/SOURCE_METHODOLOGY.md`.

## Legacy Preview

The directly openable `preview.html` remains the Phase 4 standalone cinematic/mobile prototype so that Phase 1 does not regress the current user experience. The production React entry point is `index.html`.

## Next Phase

Phase 2: **Continuous Universe + Next-Generation 3D Engine**

The next implementation will use the new architecture to create a continuous scale transition:

Intelligent Infinity → Logos → Galaxy → Star → Planet → Civilization → Entity → Energy Centers → Inner Consciousness.
