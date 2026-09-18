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
  sourceClassification: 'SOURCE_BACKED';
  accumulatedLessonIds: string[];
  guidance: { patterns: string[]; suggestedLessons: string[]; sourceClassification: 'INFERRED' } | null;
}
