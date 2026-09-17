import type { DensityNumber } from '../densities/types.js';
import type { EnergyCenterState } from '../energyCenters/types.js';
import type { PolarityState } from '../polarity/types.js';

export interface CatalystMemory {
  id: string;
  category: string;
  intensity: number;
  interpretedAs: string;
  response: string;
  stoDelta: number;
  stsDelta: number;
}

export interface EntityState {
  id: string;
  name: string;
  currentDensity: DensityNumber;
  veilActive: boolean;
  polarity: PolarityState;
  energyCenters: EnergyCenterState[];
  catalystHistory: CatalystMemory[];
  incarnationCount: number;
  awareness: number;
  compassion: number;
  wisdom: number;
}
