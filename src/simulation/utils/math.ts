export const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

export const roundTo = (value: number, digits = 3): number => {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
};
