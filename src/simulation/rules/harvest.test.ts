import { describe, expect, it } from 'vitest';
import { assessThirdDensityHarvest } from './harvest.js';

describe('assessThirdDensityHarvest', () => {
  it('uses the source-backed positive threshold', () => {
    expect(assessThirdDensityHarvest({ serviceToOthers: 0.51, serviceToSelf: 0.2, orientation: 'POSITIVE' }))
      .toEqual({ harvestable: true, path: 'POSITIVE', threshold: 0.51 });
  });

  it('uses the source-backed negative threshold', () => {
    expect(assessThirdDensityHarvest({ serviceToOthers: 0.03, serviceToSelf: 0.95, orientation: 'NEGATIVE' }))
      .toEqual({ harvestable: true, path: 'NEGATIVE', threshold: 0.95 });
  });
});
