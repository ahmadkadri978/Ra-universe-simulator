export interface ProbabilityBranch {
  id: string;
  label: string;
  weight: number;
  open: boolean;
  source: 'SIMULATION_ABSTRACTION';
}

export interface HigherSelfState {
  available: boolean;
  probabilityBranches: ProbabilityBranch[];
  programmedLessonIds: string[];
}
