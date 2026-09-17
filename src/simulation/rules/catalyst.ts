import type { CatalystMemory, EntityState } from '../../domain/entities/types.js';
import type { ChoiceOrientation } from '../../domain/polarity/types.js';
import { calculateChoicePolarityDelta, applyPolarityDelta } from './polarity.js';
import { clamp01 } from '../utils/math.js';

export interface CatalystInput {
  id: string;
  category: string;
  intensity: number;
  perception: string;
  response: ChoiceOrientation;
}

export const applyCatalyst = (entity: EntityState, catalyst: CatalystInput): EntityState => {
  const intensity = clamp01(catalyst.intensity);
  const delta = calculateChoicePolarityDelta(catalyst.response, intensity);
  const polarity = applyPolarityDelta(entity.polarity, delta);

  const greenShift = catalyst.response === 'acceptance' ? intensity * 0.025 : -intensity * 0.01;
  const yellowShift = catalyst.response === 'control' ? intensity * 0.025 : -intensity * 0.005;

  const energyCenters = entity.energyCenters.map((center) => {
    if (center.id === 'green') {
      return {
        ...center,
        activation: clamp01(center.activation + greenShift),
        balance: clamp01(center.balance + (catalyst.response === 'acceptance' ? 0.015 : -0.005)),
      };
    }
    if (center.id === 'yellow') {
      return {
        ...center,
        activation: clamp01(center.activation + yellowShift),
        balance: clamp01(center.balance + (catalyst.response === 'control' ? -0.01 : 0.005)),
      };
    }
    return center;
  });

  const memory: CatalystMemory = {
    id: catalyst.id,
    category: catalyst.category,
    intensity,
    interpretedAs: catalyst.perception,
    response: catalyst.response,
    stoDelta: delta.sto,
    stsDelta: delta.sts,
  };

  return {
    ...entity,
    polarity,
    energyCenters,
    catalystHistory: [...entity.catalystHistory, memory],
    compassion: clamp01(entity.compassion + (catalyst.response === 'acceptance' ? intensity * 0.02 : 0)),
    awareness: clamp01(entity.awareness + intensity * 0.006),
  };
};
