import type { UniverseScaleDefinition, UniverseScaleId } from './types.js';

export const universeScaleOrder: readonly UniverseScaleId[] = [
  'infinity',
  'logos',
  'galaxy',
  'star',
  'planet',
  'civilization',
  'entity',
  'energy',
  'inner',
] as const;

export const universeScales: readonly UniverseScaleDefinition[] = [
  {
    id: 'infinity',
    index: 0,
    label: 'Intelligent Infinity',
    shortLabel: 'Infinity',
    description: 'The simulation opens in an undifferentiated field. The field geometry is a visual metaphor, not a literal claim about shape.',
    ontologyConceptId: 'intelligent_infinity',
    representationClass: 'SIMULATION_ABSTRACTION',
    parentId: null,
    childId: 'logos',
    anchor: [0, 0, 0],
    cameraOffset: [0, 0.5, 11],
    orbitMinDistance: 7,
    orbitMaxDistance: 18,
    visualIntent: 'Near-symmetry, no privileged center, subtle latent motion.',
  },
  {
    id: 'logos',
    index: 1,
    label: 'Love / Logos',
    shortLabel: 'Logos',
    description: 'A focusing principle organizes the previously undifferentiated field into coherent creative structure.',
    ontologyConceptId: 'logos_love',
    representationClass: 'SIMULATION_ABSTRACTION',
    parentId: 'infinity',
    childId: 'galaxy',
    anchor: [0, 0, -19],
    cameraOffset: [0, 0.6, 8.5],
    orbitMinDistance: 4.5,
    orbitMaxDistance: 13,
    visualIntent: 'Focused golden coherence and ordered radial relationships.',
  },
  {
    id: 'galaxy',
    index: 2,
    label: 'Galaxy / Local Creation',
    shortLabel: 'Galaxy',
    description: 'A navigational scale representing a local creative system. The exact camera nesting is a visualization choice.',
    ontologyConceptId: 'creation',
    representationClass: 'SIMULATION_ABSTRACTION',
    parentId: 'logos',
    childId: 'star',
    anchor: [0, 0, -36],
    cameraOffset: [0.5, 2.3, 10.5],
    orbitMinDistance: 7,
    orbitMaxDistance: 16,
    visualIntent: 'Spiral organization emerging from luminous structure.',
  },
  {
    id: 'star',
    index: 3,
    label: 'Star / Sub-Logos Scale',
    shortLabel: 'Star',
    description: 'A stellar scale used to move from local creation into a planetary field. The visual star system is representational.',
    ontologyConceptId: 'creation',
    representationClass: 'SIMULATION_ABSTRACTION',
    parentId: 'galaxy',
    childId: 'planet',
    anchor: [2.8, 0.2, -50],
    cameraOffset: [0, 1.5, 7.7],
    orbitMinDistance: 4.8,
    orbitMaxDistance: 11,
    visualIntent: 'Concentrated stellar source with clearly organized orbital relationships.',
  },
  {
    id: 'planet',
    index: 4,
    label: 'Planetary Field',
    shortLabel: 'Planet',
    description: 'A planetary locus of experience surrounded by density and collective-state representations.',
    ontologyConceptId: 'density',
    representationClass: 'SIMULATION_ABSTRACTION',
    parentId: 'star',
    childId: 'civilization',
    anchor: [2.8, -0.2, -61.5],
    cameraOffset: [0, 0.8, 5.8],
    orbitMinDistance: 3.8,
    orbitMaxDistance: 8.8,
    visualIntent: 'Planetary sphere, collective nodes, fragmented D3 field and coherent D6 reference shell.',
  },
  {
    id: 'civilization',
    index: 5,
    label: 'Civilization / Social Field',
    shortLabel: 'Civilization',
    description: 'A collective network scale between the planetary environment and individual entity experience.',
    ontologyConceptId: 'social_memory_complex',
    representationClass: 'SIMULATION_ABSTRACTION',
    parentId: 'planet',
    childId: 'entity',
    anchor: [3.2, -0.35, -70],
    cameraOffset: [0.8, 1.1, 5.2],
    orbitMinDistance: 3.2,
    orbitMaxDistance: 7.5,
    visualIntent: 'Distinct individuals connected by changing information and relational networks.',
  },
  {
    id: 'entity',
    index: 6,
    label: 'Mind/Body/Spirit Complex',
    shortLabel: 'Entity',
    description: 'The individual locus through which catalyst, energetic response, and orientation are experienced.',
    ontologyConceptId: 'mind_body_spirit_complex',
    representationClass: 'SIMULATION_ABSTRACTION',
    parentId: 'civilization',
    childId: 'energy',
    anchor: [3.2, -0.2, -78],
    cameraOffset: [0.5, 0.8, 4.3],
    orbitMinDistance: 2.5,
    orbitMaxDistance: 6.5,
    visualIntent: 'An abstract entity silhouette with visible energetic and relational structure.',
  },
  {
    id: 'energy',
    index: 7,
    label: 'Energy Centers',
    shortLabel: 'Energy',
    description: 'A close-scale teaching representation of red through violet energy centers and their relative flow.',
    ontologyConceptId: 'mind_body_spirit_complex',
    representationClass: 'SIMULATION_ABSTRACTION',
    parentId: 'entity',
    childId: 'inner',
    anchor: [3.2, -0.1, -84.5],
    cameraOffset: [0.25, 0.3, 3.7],
    orbitMinDistance: 2.2,
    orbitMaxDistance: 5.4,
    visualIntent: 'Large, readable centers connected by an animated vertical flow.',
  },
  {
    id: 'inner',
    index: 8,
    label: 'Inner Consciousness',
    shortLabel: 'Inner',
    description: 'An interpretive interior scale for pattern, catalyst integration, and inward relation. Geometry is deliberately marked as abstraction.',
    ontologyConceptId: 'catalyst',
    representationClass: 'SIMULATION_ABSTRACTION',
    parentId: 'energy',
    childId: null,
    anchor: [3.2, 0, -90.5],
    cameraOffset: [0, 0.1, 3.2],
    orbitMinDistance: 1.8,
    orbitMaxDistance: 4.8,
    visualIntent: 'Branching inward relations, subtle pulses, and low-noise reflective space.',
  },
] as const;

export const universeScaleMap = new Map<UniverseScaleId, UniverseScaleDefinition>(
  universeScales.map((scale) => [scale.id, scale]),
);

export function getUniverseScale(id: UniverseScaleId): UniverseScaleDefinition {
  const scale = universeScaleMap.get(id);
  if (!scale) throw new Error(`Unknown universe scale: ${id}`);
  return scale;
}

export function getScaleIndex(id: UniverseScaleId): number {
  return getUniverseScale(id).index;
}

export function getScalePath(to: UniverseScaleId): readonly UniverseScaleId[] {
  return universeScaleOrder.slice(0, getScaleIndex(to) + 1);
}

export function getScaleProgress(id: UniverseScaleId): number {
  return getScaleIndex(id) / Math.max(1, universeScaleOrder.length - 1);
}
