export type PerspectiveMode = 'INCARNATE_SELF' | 'HIGHER_SELF' | 'TOTALITY';
export type RealityMode = 'SPACE_TIME' | 'TIME_SPACE';
export interface TimeSpaceState {
  entityId: string;
  incarnationId: string;
  reality: RealityMode;
  perspective: PerspectiveMode;
  selectedEventId: string | null;
  selectedPossibilityId: string | null;
  sourceClassification: 'SIMULATION_ABSTRACTION';
}
export interface LifeReview {
  entityId: string;
  incarnationId: string;
  eventIds: string[];
  patterns: { lesson: string; eventIds: string[]; response: string }[];
  unresolvedEventIds: string[];
  integratedEventIds: string[];
  sourceClassification: 'SIMULATION_ABSTRACTION';
}
