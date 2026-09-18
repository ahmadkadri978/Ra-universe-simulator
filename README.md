# The Law of One Ontology Simulator

An interactive, source-traceable model of concepts described in *The Ra Contact / Law of One*.

## Phase 3 — The life pattern

The original continuous universe remains intact:

**Intelligent Infinity → Logos → Galaxy → Star → Planet → Civilization → Entity → Energy Centers → Inner Consciousness**

Phase 3 extends that world into incarnation, Time/Space, Higher Self, possibility vortices, and life programming. The camera travels within one scene; no page routing is involved.

### Explore

1. Select **Explore a life**, or continue through Entity and Inner Consciousness.
2. Open **Life programming** and configure seven illustrative conditions.
3. Enter incarnation, enter the veil, and meet a catalyst.
4. Choose a response as the **Incarnate self**. Inspect the changed possibility field.
5. Explore physical death, review the recorded events, and mark experiences as integrated.
6. Visit **Higher Self** for optional pattern guidance. **Totality** also exposes archived life events and parent–child possibility connections.
7. Prepare another incarnation. The earlier life stays in the session archive.

On phones, use **Open controls** for the planning, choice, and review panel. Canvas interactions also have text controls. Sources open in an accessible dialog.

**Higher Self cannot choose for the entity.** Runtime reducer checks reject choices from Higher Self, Totality, or a broader viewing lens. Guidance changes neither responses nor polarity.

**Visual weights are not probabilities.** Numbers, branch rules, geometry, colors, timing, and example consequences are simulation abstractions. Programmed conditions never assign a response.

## Run

Use Node.js 22.12 or later.

```sh
npm install
npm run dev
```

Development: **http://127.0.0.1:5174** (Vite selects another port if occupied).

```sh
npm test
npm run build
npm run preview
```

Production preview: **http://127.0.0.1:4173**. Serve the generated `dist/` through HTTP; do not open its HTML as a local file.

`npm test` runs the Phase 1 assertions, Phase 2 navigation and architecture checks, 13 Phase 3 behavioral tests, and the existing Vitest tests. `npm run verify:phase3` runs the pure model checks plus TypeScript. The lockfile records the verified dependencies.

The tool launcher normally uses native esbuild. On hosts that reject subprocess pipes with EPERM/EACCES, it uses esbuild's WebAssembly build with a private filesystem adapter. This fallback was used to verify the Windows build, tests, and development server. It does not ship to the browser. Symlink preservation is enabled only for that fallback.

## Architecture

React 18 + TypeScript + React Three Fiber / Three.js + Zustand + Vite.

```text
src/
  domain/         ontology and typed state, including possibility and timeSpace
  simulation/
    incarnation/  guarded lifecycle, planning, seeded examples, selectors
    higherSelf/   optional guidance with no choice authority
    possibility/  reusable deterministic graph transitions
    lifeReview/   actual event grouping and integration annotations
    engine/       pure event reducer
    store/        Zustand adapter
  sources/        evidence catalog and session/question references
  visual/
    navigation/   nine original scales plus five nested Phase 3 views
    incarnation/  persistent identity, event lattice, planning constellation
    timeSpace/    relational field
    higherSelf/   layered information atlas
    possibility/  branching splines and flow
    effects/      optional desktop bloom
  ui/
    phase2/       original universe controls
    phase3/       planning, perspectives, choices, review, source dialog
  app/            composition root
```

Domain and simulation rules remain independent of React and Three.js. The architecture check enforces this on Windows and Unix.

## Evidence

- `SOURCE_BACKED`: a concept supported by linked session/question references.
- `INFERRED`: an interpretive relationship or guidance suggestion.
- `SIMULATION_ABSTRACTION`: an authored interface, geometry, number, or mechanic.

Read [Phase 3 design](docs/PHASE_3_HIGHER_SELF.md), [verification report](docs/PHASE_3_REPORT.md), [architecture](docs/ARCHITECTURE.md), [constitution](docs/SIMULATION_CONSTITUTION.md), and [source methodology](docs/SOURCE_METHODOLOGY.md).

## Scope and limits

State is held in memory. Reloading starts a fresh session. The model is educational, not a prediction, a metaphysical measurement, or evidence that adversity was chosen.

Rendering caps event geometry at 8 nodes on compact screens and 14 on desktop; the appropriate lens's complete record remains in the text panel. Mobile disables bloom, limits DPR, and reduces detail. **Soft light** enables optional desktop bloom.

The archived prototype remains at `public/legacy-phase4-preview.html`. Advanced Phase 4 catalyst simulation, Guided Journey, and audio are outside this release.
