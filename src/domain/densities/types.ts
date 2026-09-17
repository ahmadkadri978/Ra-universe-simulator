export type DensityNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface DensityDefinition {
  number: DensityNumber;
  name: string;
  coreLesson: string;
  visualIntent: string;
  simulationCapabilities: readonly string[];
}
