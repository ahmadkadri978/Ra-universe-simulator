import type { CatalystEvent, LifeEvent } from '../../domain/incarnation/events.js';
import type { IncarnationState } from '../../domain/incarnation/types.js';
import { createDeterministicRandom } from '../utils/deterministicRandom.js';

const situations = {
  rejection: ['An invitation unanswered', 'Someone important does not respond as you hoped. How will you meet the uncertainty?'],
  responsibility: ['A shared task', 'A commitment asks for more attention than expected. You can choose how to respond.'],
  power: ['A position of influence', 'Others look to you for a decision. There is room for listening, control, or waiting.'],
  compassion: ['A request for support', 'Someone asks for help while your own resources are limited. A response remains yours.'],
} as const;
export function createCatalyst(incarnation: IncarnationState, seed: number): CatalystEvent {
  const count = incarnation.events.filter((event) => event.kind === 'CATALYST').length;
  const keys = Object.keys(situations) as (keyof typeof situations)[];
  const random = createDeterministicRandom(seed + incarnation.cycle * 101 + count * 31);
  const key = count === 0 ? incarnation.program.catalystOpportunity : keys[Math.floor(random.next() * keys.length)] ?? 'rejection';
  const [label, description] = situations[key];
  return {
    id: `${incarnation.id}-catalyst-${count + 1}`, label, description, lesson: incarnation.program.lessonFocus,
    relationship: incarnation.program.relationship, energyCenters: key === 'power' ? ['yellow', 'green'] : ['orange', 'green', 'blue'],
    sourceClassification: 'SIMULATION_ABSTRACTION',
  };
}
export function lifeMarker(incarnation: IncarnationState, kind: 'ENTRY' | 'DEATH'): LifeEvent {
  return {
    id: `${incarnation.id}-${kind.toLowerCase()}`, incarnationId: incarnation.id, entityId: incarnation.entityId,
    sequence: incarnation.events.length, kind, label: kind === 'ENTRY' ? 'Entry into incarnation' : 'Physical death / indigo transition',
    catalyst: null, choice: null, energyResponse: kind === 'ENTRY' ? 'Embodied perspective' : 'Indigo / form-maker reference',
    orientation: 'NONE', sourceClassification: 'SIMULATION_ABSTRACTION',
  };
}
