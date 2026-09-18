import type { IncarnationProgram } from './program.js';
import type { CatalystEvent, LifeEvent } from './events.js';

export type IncarnationPhase = 'PLANNING' | 'ENTRY' | 'INCARNATE' | 'DEATH_TRANSITION' | 'REVIEW' | 'HEALING';

export interface IncarnationPlan {
  id: string;
  lessons: string[];
  limitations: string[];
  relationshipThemes: string[];
  catalystThemes: string[];
}

export interface IncarnationState {
  id: string;
  entityId: string;
  cycle: number;
  sourceClassification: 'SIMULATION_ABSTRACTION';
  phase: IncarnationPhase;
  age: number;
  plan: IncarnationPlan;
  program: IncarnationProgram;
  events: LifeEvent[];
  pendingCatalyst: CatalystEvent | null;
  archive: { id: string; program: IncarnationProgram; events: LifeEvent[]; integratedEventIds: string[] }[];
}
