import type { PolarityState } from '../../domain/polarity/types.js';

export type HarvestAssessment =
  | { harvestable: true; path: 'POSITIVE'; threshold: 0.51 }
  | { harvestable: true; path: 'NEGATIVE'; threshold: 0.95 }
  | { harvestable: false; path: 'REPEAT_THIRD_DENSITY'; threshold: null };

export const assessThirdDensityHarvest = (polarity: PolarityState): HarvestAssessment => {
  if (polarity.serviceToOthers >= 0.51) {
    return { harvestable: true, path: 'POSITIVE', threshold: 0.51 };
  }

  if (polarity.serviceToSelf >= 0.95) {
    return { harvestable: true, path: 'NEGATIVE', threshold: 0.95 };
  }

  return { harvestable: false, path: 'REPEAT_THIRD_DENSITY', threshold: null };
};
