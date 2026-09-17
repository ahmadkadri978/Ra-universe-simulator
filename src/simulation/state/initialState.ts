import { createDefaultEnergyCenters } from '../../domain/energyCenters/energyCenters.js';
import type { SimulationState } from './types.js';

export const createInitialSimulationState = (seed = 19810115): SimulationState => ({
  seed,
  clock: {
    tick: 0,
    paused: true,
    speed: 1,
  },
  selectedConceptId: 'intelligent_infinity',
  entity: {
    id: 'entity-primary',
    name: 'Primary Entity',
    currentDensity: 3,
    veilActive: true,
    polarity: {
      serviceToOthers: 0.46,
      serviceToSelf: 0.22,
      orientation: 'UNPOLARIZED',
    },
    energyCenters: createDefaultEnergyCenters(),
    catalystHistory: [],
    incarnationCount: 17,
    awareness: 0.48,
    compassion: 0.44,
    wisdom: 0.31,
  },
  incarnation: {
    phase: 'INCARNATE',
    age: 31,
    plan: {
      id: 'plan-primary',
      lessons: ['acceptance', 'responsibility', 'balanced service'],
      limitations: ['partial memory', 'uncertainty', 'finite lifespan'],
      relationshipThemes: ['trust', 'boundaries', 'service'],
      catalystThemes: ['loss', 'power', 'belonging'],
    },
  },
  higherSelf: {
    available: true,
    programmedLessonIds: ['acceptance', 'responsibility', 'balanced-service'],
    probabilityBranches: [
      { id: 'branch-a', label: 'Acceptance / integration', weight: 0.36, open: true, source: 'SIMULATION_ABSTRACTION' },
      { id: 'branch-b', label: 'Control / separation', weight: 0.22, open: true, source: 'SIMULATION_ABSTRACTION' },
      { id: 'branch-c', label: 'Deferred choice', weight: 0.42, open: true, source: 'SIMULATION_ABSTRACTION' },
    ],
  },
  socialMemory: {
    memberCount: 64,
    coherence: 0.28,
    sharedMemoryAccess: 0.18,
    transparency: 0.23,
    individualityPreserved: true,
  },
});
