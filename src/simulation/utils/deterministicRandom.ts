export interface DeterministicRandom {
  next(): number;
  nextBetween(min: number, max: number): number;
}

export const createDeterministicRandom = (seed: number): DeterministicRandom => {
  let state = seed >>> 0;

  const next = (): number => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };

  return {
    next,
    nextBetween: (min: number, max: number) => min + (max - min) * next(),
  };
};
