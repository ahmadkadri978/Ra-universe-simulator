export type EnergyCenterId = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

export interface EnergyCenterState {
  id: EnergyCenterId;
  activation: number;
  blockage: number;
  balance: number;
}

export interface EnergyCenterDefinition {
  id: EnergyCenterId;
  order: number;
  label: string;
  functionalTheme: string;
}
