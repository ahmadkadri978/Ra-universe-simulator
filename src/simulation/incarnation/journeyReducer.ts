import type { SimulationState } from '../state/types.js';
import type { JourneyAction } from './actions.js';
import { createIncarnation, updateProgram } from './programming.js';
import { createCatalyst, lifeMarker } from './catalyst.js';
import { createPossibilityGraph, evolvePossibilities } from '../possibility/engine.js';
import { createLifeReview, integrateEvent } from '../lifeReview/review.js';
import { exposeGuidance } from '../higherSelf/guidance.js';
import type { LifeEvent } from '../../domain/incarnation/events.js';

export function journeyReducer(state: SimulationState, action: JourneyAction): SimulationState {
  const life = state.incarnation;
  switch (action.type) {
    case 'PROGRAM': {
      if (life.phase !== 'PLANNING') return state;
      const program = updateProgram(life.program, action.field, action.value);
      if (program === life.program) return state;
      return { ...state, incarnation: { ...life, program, plan: { ...life.plan, lessons: [program.lessonFocus], limitations: [program.limitation], relationshipThemes: [program.relationship], catalystThemes: [program.catalystOpportunity] } } };
    }
    case 'ENTER':
      if (life.phase !== 'PLANNING') return state;
      return { ...state, incarnation: { ...life, phase: 'ENTRY', events: [lifeMarker(life, 'ENTRY')] }, timeSpace: { ...state.timeSpace, perspective: 'INCARNATE_SELF', reality: 'SPACE_TIME' }, higherSelf: { ...state.higherSelf, programmedLessonIds: [life.program.lessonFocus] } };
    case 'VEIL':
      if (life.phase !== 'ENTRY') return state;
      return { ...state, incarnation: { ...life, phase: 'INCARNATE' }, entity: { ...state.entity, veilActive: true } };
    case 'CATALYST': {
      if (life.phase !== 'INCARNATE' || life.pendingCatalyst) return state;
      const catalyst = createCatalyst(life, state.seed);
      const event: LifeEvent = { id: catalyst.id, incarnationId: life.id, entityId: life.entityId, sequence: life.events.length, kind: 'CATALYST', label: catalyst.label, catalyst, choice: null, energyResponse: 'Response remains open', orientation: 'UNRESOLVED', sourceClassification: 'SIMULATION_ABSTRACTION' };
      return { ...state, incarnation: { ...life, events: [...life.events, event], pendingCatalyst: catalyst }, possibilities: createPossibilityGraph(life.entityId, catalyst.id, catalyst.lesson), timeSpace: { ...state.timeSpace, selectedEventId: event.id, selectedPossibilityId: null } };
    }
    case 'CHOOSE': {
      // Runtime authority gate also rejects forged input; a broader view never grants control.
      if (action.actor !== 'ENTITY' || state.timeSpace.perspective !== 'INCARNATE_SELF' || life.phase !== 'INCARNATE' || !life.pendingCatalyst || !['accept', 'control', 'defer'].includes(action.response)) return state;
      const catalyst = life.pendingCatalyst;
      const events = life.events.map((event): LifeEvent => event.id !== catalyst.id ? event : {
        ...event, choice: { id: `${event.id}-choice`, catalystId: catalyst.id, actor: 'ENTITY', response: action.response, sourceClassification: 'SIMULATION_ABSTRACTION' },
        energyResponse: action.response === 'accept' ? 'Green / blue: openness and expression' : action.response === 'control' ? 'Yellow: organizing and directing' : 'Orange: uncertainty held open',
        orientation: action.response === 'accept' ? 'OPENNESS' : action.response === 'control' ? 'CONTROL' : 'UNRESOLVED',
      });
      return { ...state, incarnation: { ...life, events, pendingCatalyst: null, age: life.age + 1 }, possibilities: evolvePossibilities(state.possibilities, action.response, catalyst.id, catalyst.lesson) };
    }
    case 'DEATH':
      if (life.phase !== 'INCARNATE') return state;
      return { ...state, incarnation: { ...life, phase: 'DEATH_TRANSITION', pendingCatalyst: null, events: [...life.events, lifeMarker(life, 'DEATH')] }, entity: { ...state.entity, veilActive: false }, timeSpace: { ...state.timeSpace, reality: 'TIME_SPACE', perspective: 'INCARNATE_SELF' } };
    case 'REVIEW':
      if (life.phase !== 'DEATH_TRANSITION') return state;
      return { ...state, incarnation: { ...life, phase: 'REVIEW' }, lifeReview: createLifeReview(life) };
    case 'HEALING':
      if (life.phase !== 'REVIEW') return state;
      return { ...state, incarnation: { ...life, phase: 'HEALING' }, higherSelf: exposeGuidance(state.higherSelf, life) };
    case 'INTEGRATE':
      if (life.phase !== 'HEALING' || !state.lifeReview) return state;
      return { ...state, lifeReview: integrateEvent(state.lifeReview, action.eventId) };
    case 'NEXT_INCARNATION': {
      if (life.phase !== 'HEALING') return state;
      const next = createIncarnation(life.entityId, life.cycle + 1, life.program);
      next.archive = [...life.archive, { id: life.id, program: life.program, events: life.events, integratedEventIds: state.lifeReview?.integratedEventIds ?? [] }];
      return { ...state, incarnation: next, lifeReview: null, possibilities: createPossibilityGraph(life.entityId, `${next.id}-open`), timeSpace: { ...state.timeSpace, incarnationId: next.id, reality: 'TIME_SPACE', perspective: 'HIGHER_SELF', selectedEventId: null, selectedPossibilityId: null }, entity: { ...state.entity, incarnationCount: state.entity.incarnationCount + 1 } };
    }
    case 'PERSPECTIVE':
      if (!['INCARNATE_SELF', 'HIGHER_SELF', 'TOTALITY'].includes(action.perspective)) return state;
      return { ...state, timeSpace: { ...state.timeSpace, perspective: action.perspective } };
    case 'REALITY':
      if (!['SPACE_TIME', 'TIME_SPACE'].includes(action.reality)) return state;
      return { ...state, timeSpace: { ...state.timeSpace, reality: action.reality } };
    case 'INSPECT_EVENT': {
      const exists = [...life.events, ...life.archive.flatMap((item) => item.events)].some((event) => event.id === action.eventId);
      return exists ? { ...state, timeSpace: { ...state.timeSpace, selectedEventId: action.eventId } } : state;
    }
    case 'INSPECT_POSSIBILITY':
      return state.possibilities.nodes.some((node) => node.id === action.possibilityId) ? { ...state, timeSpace: { ...state.timeSpace, selectedPossibilityId: action.possibilityId } } : state;
    case 'GUIDANCE':
      return { ...state, higherSelf: exposeGuidance(state.higherSelf, life) };
    default: {
      const unreachable: never = action;
      return unreachable;
    }
  }
}
