import type { SourceRecord } from './types.js';
import { phase3Sources } from './concepts/phase3.js';

export const sourceCatalog: readonly SourceRecord[] = [
  ...phase3Sources,
  {
    id: 'source-intelligent-infinity',
    conceptId: 'intelligent_infinity',
    title: 'Intelligent Infinity / Unity',
    classification: 'SOURCE_BACKED',
    summary: 'The material describes intelligent infinity as the undifferentiated unity/potential underlying creation and the Creator knowing Itself through experience.',
    references: [
      { session: 13, question: 7, note: 'Awareness and the focusing of infinity into intelligent energy.' },
      { session: 27, question: 8, note: 'Free Will framed in relation to the Creator knowing Itself.' },
    ],
  },
  {
    id: 'source-primal-distortions',
    conceptId: 'free_will',
    title: 'First Three Distortions',
    classification: 'SOURCE_BACKED',
    summary: 'Free Will is identified as the First Distortion, Love/Logos as the Second, and Light as the subsequent primal distortion.',
    references: [
      { session: 15, question: 21, note: 'Explicit sequence: Free Will → Logos/Love → Light.' },
      { session: 27, question: '8-17', note: 'Extended discussion of Free Will, Love, and Light.' },
    ],
  },
  {
    id: 'source-cosmogenesis',
    conceptId: 'creation',
    title: 'Cosmogenesis',
    classification: 'SOURCE_BACKED',
    summary: 'The text describes intelligent energy forming patterns, local rhythms, fields, dimensions, universes, and physical matter through Light.',
    references: [
      { session: 13, question: '7-10', note: 'Logos, free will, patterns, dimensions, universes, and Light.' },
    ],
  },
  {
    id: 'source-density-overview',
    conceptId: 'density',
    title: 'Density Progression',
    classification: 'SOURCE_BACKED',
    summary: 'The octave is described as sequential densities with fourth focused on love/understanding, fifth on light/wisdom, sixth on integration, seventh on foreverness, and eighth as completion/new octave.',
    references: [
      { session: 1, question: 1, note: 'Ra identifies its sixth-density standpoint and the harmonization of polarities.' },
      { session: 7, question: '16-17', note: 'Progress through densities described as sequential.' },
    ],
  },
  {
    id: 'source-energy-centers',
    conceptId: 'mind_body_spirit_complex',
    title: 'Energy Centers',
    classification: 'SOURCE_BACKED',
    summary: 'Red through violet energy centers are described as a structured set of energy nexi with characteristic blockages and functions.',
    references: [
      { session: 15, question: 12, note: 'Summary of red, orange, yellow, green, blue, indigo, and violet centers.' },
      { session: 54, question: '11-15', note: 'Blockage, balancing, and experiential energy flow.' },
    ],
  },
  {
    id: 'source-catalyst',
    conceptId: 'catalyst',
    title: 'Catalyst and Experience',
    classification: 'SOURCE_BACKED',
    summary: 'Catalyst is experience entering awareness and becoming material for activation, balancing, and choice; the exact numerical mechanics used by the simulator are not supplied by Ra.',
    references: [
      { session: 50, question: '2-4', note: 'Experience/catalyst entering through foundational response and being attracted into awareness.' },
      { session: 54, question: '14-15', note: 'Catalyst is not limited to already-blocked centers and balancing remains central.' },
    ],
    implementationNote: 'All numeric catalyst deltas are simulation abstractions.'
  },
  {
    id: 'source-harvest-thresholds',
    conceptId: 'polarity',
    title: 'Third-Density Harvest Polarity Thresholds',
    classification: 'SOURCE_BACKED',
    summary: 'The text gives 51% dedication to others for positive harvestability and 95% service to self / 5% to others for negative harvestability.',
    references: [
      { session: 17, question: '32-33', note: 'Explicit positive and negative harvestability thresholds.' },
    ],
  },
  {
    id: 'source-harvest-resonance',
    conceptId: 'harvest',
    title: 'Harvest as Vibrational Compatibility',
    classification: 'SOURCE_BACKED',
    summary: 'Harvest is described through self-selection into the vibratory environment most comfortable to the entity, including the line-of-light image.',
    references: [
      { session: 6, question: 14, note: 'Entity moves along intensifying light/love until the intensity becomes too strong.' },
    ],
  },
  {
    id: 'source-higher-self',
    conceptId: 'higher_self',
    title: 'Higher Self and Probability/Possibility Vortices',
    classification: 'SOURCE_BACKED',
    summary: 'The higher self is described as a resource for healing and life programming that can use probability/possibility information without removing free choice.',
    references: [
      { session: 36, question: '1-7', note: 'Higher self, totality, probability/possibility vortices, future standpoint, and free will.' },
    ],
    implementationNote: 'Branch weights and graph mathematics are visualization/simulation abstractions.'
  },
  {
    id: 'source-social-memory',
    conceptId: 'social_memory_complex',
    title: 'Social Memory Complex and Shared Thought',
    classification: 'SOURCE_BACKED',
    summary: 'The material describes social memory complexes as collective structures in which information and understandings can be shared while individual entities continue to function.',
    references: [
      { session: 16, question: 32, note: 'Voluntary sharing into a central thought complex available to all.' },
      { session: 7, question: 16, note: 'Mass mind/body/spirit complex and the melding of harvested entities.' },
    ],
  },
  {
    id: 'source-space-time-time-space',
    conceptId: 'space_time',
    title: 'Space/Time and Time/Space',
    classification: 'SOURCE_BACKED',
    summary: 'The material distinguishes the incarnate physical arena from its metaphysical counterpart; the exact geometry of the simulator is representational rather than textual doctrine.',
    references: [
      { session: 36, question: '1-7', note: 'Higher-self discussion explicitly contrasts structured space/time with broader probability information.' },
      { session: 47, question: '11-15', note: 'Post-death transition and indigo/form-maker body.' },
    ],
    implementationNote: 'Any 3D topology used to show time/space is a visualization abstraction.'
  },
  {
    id: 'source-quarantine',
    conceptId: 'creation',
    title: 'Quarantine / Guardian Constraint',
    classification: 'SOURCE_BACKED',
    summary: 'The material describes quarantine, permission constraints, and Guardian activity in relation to free will and contact.',
    references: [
      { session: 12, question: '3-7', note: 'Guardian quarantine and the love/light boundary.' },
    ],
  },
] as const;
