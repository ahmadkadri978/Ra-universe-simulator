# The Law of One Ontology Simulator

An interactive, source-traceable visualization and simulation architecture for the ontology described in *The Ra Contact / Law of One*.

The project keeps a strict distinction between source-backed concepts, inference, and simulator-only visual/mechanical abstractions.

## Current Phase

**Phase 2 — Continuous Universe + Next-Generation 3D Engine**

The production React/Three application now uses one continuous world rather than page-like scene switching:

**Intelligent Infinity → Logos → Galaxy → Star → Planet → Civilization → Entity → Energy Centers → Inner Consciousness**

Clicking focal objects moves the camera deeper into the same conceptual universe. Breadcrumbs and Back return through previous scales.

## Phase 2 Visual Systems

- deterministic procedural particle fields
- cinematic camera travel
- click-to-travel object picking
- continuous world spine
- emissive and additive glow layers
- animated curved energy streams
- depth fog and layered translucent fields
- distinct scale-specific visual grammar
- fragmented D3 vs coherent D6 teaching metaphors
- responsive HUD and mobile-compatible orbit/zoom controls
- Source Inspector integrated with the active scale

The scale geometry and camera nesting are explicitly classified as `SIMULATION_ABSTRACTION`; they are not presented as literal geometry stated by Ra.

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

Offline architectural verification:

```bash
npm run verify:phase2
```

`verify:phase2` checks the Phase 1 domain architecture plus the pure Phase 2 scale/navigation model without requiring the React/Three dependencies to be downloaded.

## Folder Structure

```text
src/
  app/                      composition root and global styling
  domain/                   source-oriented ontology/state definitions
  simulation/               deterministic engine, rules, events, state
  sources/                  source catalog and evidence classifications
  visual/
    components/             reusable 3D rendering primitives
    effects/                continuous world connectors
    navigation/             scale graph, camera, history, travel logic
    scales/                 Infinity → Inner scale renderers
    scenes/                 ContinuousUniverseScene
  ui/
    phase2/                  continuous-universe HUD
    SourceInspector.tsx      provenance inspection

docs/
  ARCHITECTURE.md
  SIMULATION_CONSTITUTION.md
  SOURCE_METHODOLOGY.md
  ADR-001-DOMAIN-SEPARATION.md
  PHASE_1_REPORT.md
  PHASE_2_REPORT.md
public/
  legacy-phase4-preview.html
```

## Architectural Rule

Dependency direction remains intentional:

**source/domain → simulation → store → visual/navigation → UI → app**

Simulation rules must never be embedded inside shaders, camera logic, or React components.

## Source Classification

Every meaningful concept or mechanic belongs to one of:

- `SOURCE_BACKED`
- `INFERRED`
- `SIMULATION_ABSTRACTION`

See `docs/SOURCE_METHODOLOGY.md`.

## Legacy Preview

`public/legacy-phase4-preview.html` preserves the earlier standalone cinematic prototype. The production Phase 2 implementation lives in `src/` and is launched through `index.html` using Vite.

## Next Planned Phase

Phase 3: **Higher Self + Time/Space + Probability/Possibility Vortices**.
