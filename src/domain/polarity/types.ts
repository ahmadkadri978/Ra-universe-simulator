export interface PolarityState {
  serviceToOthers: number;
  serviceToSelf: number;
  orientation: 'POSITIVE' | 'NEGATIVE' | 'UNPOLARIZED';
}

export type ChoiceOrientation = 'acceptance' | 'control' | 'neutral';
