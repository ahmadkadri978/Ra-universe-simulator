import type { ChoiceOrientation, PolarityState } from '../../domain/polarity/types.js';
import { clamp01, roundTo } from '../utils/math.js';

export interface PolarityDelta {
  sto: number;
  sts: number;
}

export const calculateChoicePolarityDelta = (
  orientation: ChoiceOrientation,
  intensity: number,
): PolarityDelta => {
  const normalized = clamp01(intensity);

  if (orientation === 'acceptance') {
    return { sto: roundTo(normalized * 0.035), sts: roundTo(-normalized * 0.01) };
  }

  if (orientation === 'control') {
    return { sto: roundTo(-normalized * 0.01), sts: roundTo(normalized * 0.035) };
  }

  return { sto: 0, sts: 0 };
};

export const applyPolarityDelta = (state: PolarityState, delta: PolarityDelta): PolarityState => {
  const serviceToOthers = clamp01(state.serviceToOthers + delta.sto);
  const serviceToSelf = clamp01(state.serviceToSelf + delta.sts);

  const orientation: PolarityState['orientation'] =
    serviceToOthers >= 0.51
      ? 'POSITIVE'
      : serviceToSelf >= 0.95
        ? 'NEGATIVE'
        : 'UNPOLARIZED';

  return { serviceToOthers, serviceToSelf, orientation };
};
