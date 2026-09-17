import type { EnergyCenterDefinition, EnergyCenterState } from './types.js';

export const energyCenterDefinitions: readonly EnergyCenterDefinition[] = [
  { id: 'red', order: 1, label: 'Red Ray', functionalTheme: 'Foundation, survival, embodiment' },
  { id: 'orange', order: 2, label: 'Orange Ray', functionalTheme: 'Personal self and self-acceptance' },
  { id: 'yellow', order: 3, label: 'Yellow Ray', functionalTheme: 'Social identity, groups, power, relationship structures' },
  { id: 'green', order: 4, label: 'Green Ray', functionalTheme: 'Universal love and compassion' },
  { id: 'blue', order: 5, label: 'Blue Ray', functionalTheme: 'Communication, expression, understanding' },
  { id: 'indigo', order: 6, label: 'Indigo Ray', functionalTheme: 'Gateway, worthiness, disciplined inner work' },
  { id: 'violet', order: 7, label: 'Violet Ray', functionalTheme: 'Total vibratory configuration' },
] as const;

export const createDefaultEnergyCenters = (): EnergyCenterState[] =>
  energyCenterDefinitions.map((definition) => ({
    id: definition.id,
    activation: definition.id === 'red' ? 0.72 : 0.5,
    blockage: 0.2,
    balance: 0.5,
  }));
