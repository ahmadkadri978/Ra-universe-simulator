export type IncarnationPhase = 'PLANNING' | 'INCARNATE' | 'DEATH_TRANSITION' | 'REVIEW' | 'HEALING';

export interface IncarnationPlan {
  id: string;
  lessons: string[];
  limitations: string[];
  relationshipThemes: string[];
  catalystThemes: string[];
}

export interface IncarnationState {
  phase: IncarnationPhase;
  age: number;
  plan: IncarnationPlan;
}
