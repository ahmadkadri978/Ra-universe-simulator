import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialSimulationState } from '../.offline-build/simulation/state/initialState.js';
import { simulationReducer } from '../.offline-build/simulation/engine/reducer.js';
import { createPossibilityGraph, evolvePossibilities, boundVisualWeight } from '../.offline-build/simulation/possibility/engine.js';
import { visibleLifeEvents } from '../.offline-build/simulation/incarnation/selectors.js';
import { programFields } from '../.offline-build/domain/incarnation/program.js';
import { phase3Concepts } from '../.offline-build/domain/ontology/phase3.js';
import { sourceCatalog } from '../.offline-build/sources/catalog.js';
import { createInitialUniverseNavigationState, travelNavigationState, travelPhase3State, backNavigationState, forwardNavigationState } from '../.phase2-build/visual/navigation/navigationLogic.js';
import { phase3Views } from '../.phase2-build/visual/navigation/phase3Views.js';
import { universeScales } from '../.phase2-build/visual/navigation/universeGraph.js';

const act = (state, action) => simulationReducer(state, { type: 'JOURNEY', action });
const actions = (state, list) => list.reduce(act, state);
const begin = () => actions(createInitialSimulationState(42), [{ type: 'ENTER' }, { type: 'VEIL' }, { type: 'CATALYST' }]);
const choose = (state, response = 'accept') => act(state, { type: 'CHOOSE', actor: 'ENTITY', response });
const review = state => actions(state, [{ type: 'DEATH' }, { type: 'REVIEW' }]);
const freeze = object => { Object.freeze(object); for (const value of Object.values(object)) if (value && typeof value === 'object' && !Object.isFrozen(value)) freeze(value); return object; };

test('Higher Self and Totality cannot choose, even with forged action input', () => {
  const initial = freeze(begin());
  for (const actor of ['HIGHER_SELF', 'TOTALITY', 'unknown']) {
    assert.equal(act(initial, { type: 'CHOOSE', actor, response: 'accept' }), initial);
  }
  for (const perspective of ['HIGHER_SELF', 'TOTALITY']) {
    const observing = act(initial, { type: 'PERSPECTIVE', perspective });
    assert.equal(choose(observing), observing);
    const guided = act(observing, { type: 'GUIDANCE' });
    assert.deepEqual(guided.entity, observing.entity);
    assert.deepEqual(guided.incarnation, observing.incarnation);
    assert.deepEqual(guided.possibilities, observing.possibilities);
    assert.equal(simulationReducer(observing, { type: 'APPLY_CATALYST', catalyst: {} }), observing);
  }
});

test('explicit choice strengthens, weakens, closes, and creates a linked possibility', () => {
  const before = freeze(begin());
  const after = choose(before);
  const byResponse = response => after.possibilities.nodes.find(node => node.responseAffinity === response);
  assert.equal(byResponse('accept').status, 'STRENGTHENED');
  assert.ok(byResponse('accept').visualWeight > before.possibilities.nodes[0].visualWeight);
  assert.equal(byResponse('control').status, 'WEAKENED');
  assert.ok(byResponse('control').visualWeight < before.possibilities.nodes[1].visualWeight);
  assert.equal(byResponse('defer').status, 'CLOSED');
  assert.equal(byResponse('defer').visualWeight, 0);
  const emerging = after.possibilities.nodes.find(node => node.status === 'EMERGENT');
  assert.equal(emerging.parentId, byResponse('accept').id);
  assert.ok(byResponse('accept').childPossibilities.includes(emerging.id));
  assert.ok(after.possibilities.nodes.filter(node => node.status !== 'CLOSED').length > 1);
  assert.equal(after.incarnation.events.filter(event => event.choice).length, 1);
  assert.equal(choose(after), after, 'a decision cannot be submitted twice');
  assert.deepEqual(after.entity.polarity, before.entity.polarity, 'no moral or polarization score in Phase 3');
});

test('weights remain finite and bounded over repeated engine evolution', () => {
  for (const value of [-100, 0, .4, 20, NaN, Infinity, -Infinity]) {
    assert.ok(boundVisualWeight(value) >= 0 && boundVisualWeight(value) <= 1);
  }
  let graph = createPossibilityGraph('entity', 'decision');
  for (let i = 0; i < 80; i++) {
    graph = evolvePossibilities(graph, ['accept', 'control', 'defer'][i % 3], 'catalyst', 'acceptance');
    assert.ok(graph.nodes.every(node => Number.isFinite(node.visualWeight) && node.visualWeight >= 0 && node.visualWeight <= 1));
    const ids = new Set(graph.nodes.map(node => node.id));
    assert.equal(ids.size, graph.nodes.length);
    for (const node of graph.nodes) for (const id of node.childPossibilities) assert.ok(ids.has(id));
  }
});

test('planning configures all seven conditions without writing choices or forcing outcomes', () => {
  let planned = createInitialSimulationState(7);
  for (const field of programFields) {
    planned = act(planned, { type: 'PROGRAM', field: field.key, value: field.options.at(-1).value });
    assert.equal(planned.incarnation.program[field.key], field.options.at(-1).value);
    assert.deepEqual(planned.incarnation.events, []);
  }
  assert.equal(act(planned, { type: 'PROGRAM', field: 'lessonFocus', value: 'invented' }), planned);
  assert.equal(act(planned, { type: 'PROGRAM', field: 'sourceClassification', value: 'SOURCE_BACKED' }), planned);
  const sameConditions = actions(planned, [{ type: 'ENTER' }, { type: 'VEIL' }, { type: 'CATALYST' }]);
  const openness = choose(sameConditions, 'accept');
  const control = choose(sameConditions, 'control');
  assert.deepEqual(openness.incarnation.program, control.incarnation.program);
  assert.notDeepEqual(openness.incarnation.events, control.incarnation.events);
  assert.equal(act(sameConditions, { type: 'PROGRAM', field: 'lessonFocus', value: 'compassion' }), sameConditions);
  assert.equal(choose(sameConditions, 'invalid'), sameConditions);
});

test('death preserves choices and unanswered catalyst; review references actual history only', () => {
  const life = act(choose(begin()), { type: 'CATALYST' });
  const afterDeath = act(freeze(life), { type: 'DEATH' });
  assert.deepEqual(afterDeath.incarnation.events.slice(0, -1), life.incarnation.events);
  assert.equal(afterDeath.incarnation.events.at(-1).kind, 'DEATH');
  assert.equal(afterDeath.incarnation.events.at(-2).choice, null);
  assert.equal(afterDeath.incarnation.pendingCatalyst, null);
  assert.equal(act(afterDeath, { type: 'DEATH' }), afterDeath);
  const reviewed = act(afterDeath, { type: 'REVIEW' });
  const ids = reviewed.incarnation.events.map(event => event.id);
  assert.deepEqual(reviewed.lifeReview.eventIds, ids);
  for (const pattern of reviewed.lifeReview.patterns) for (const id of pattern.eventIds) assert.ok(ids.includes(id));
  assert.equal(reviewed.lifeReview.patterns.find(pattern => pattern.response === 'unanswered').eventIds.length, 1);
});

test('healing annotations are valid, idempotent, and never change the recorded response', () => {
  const healing = act(review(choose(begin())), { type: 'HEALING' });
  const id = healing.incarnation.events.find(event => event.choice).id;
  const integrated = act(healing, { type: 'INTEGRATE', eventId: id });
  assert.deepEqual(integrated.incarnation, healing.incarnation);
  assert.deepEqual(integrated.lifeReview.integratedEventIds, [id]);
  assert.ok(!integrated.lifeReview.unresolvedEventIds.includes(id));
  assert.deepEqual(act(integrated, { type: 'INTEGRATE', eventId: id }), integrated);
  assert.deepEqual(act(integrated, { type: 'INTEGRATE', eventId: 'missing' }), integrated);
  assert.deepEqual(act(integrated, { type: 'INTEGRATE', eventId: healing.incarnation.events[0].id }), integrated);
});

test('a new incarnation preserves identity and archives the complete prior life', () => {
  const healed = act(review(choose(begin())), { type: 'HEALING' });
  const next = act(healed, { type: 'NEXT_INCARNATION' });
  assert.equal(next.entity.id, healed.entity.id);
  assert.equal(next.incarnation.cycle, healed.incarnation.cycle + 1);
  assert.notEqual(next.incarnation.id, healed.incarnation.id);
  assert.equal(next.timeSpace.incarnationId, next.incarnation.id);
  assert.deepEqual(next.incarnation.archive[0].events, healed.incarnation.events);
  assert.deepEqual(next.incarnation.events, []);
  assert.equal(next.lifeReview, null);
  assert.equal(next.timeSpace.selectedEventId, null);
  assert.equal(next.timeSpace.selectedPossibilityId, null);
  const totality = act(next, { type: 'PERSPECTIVE', perspective: 'TOTALITY' });
  assert.deepEqual(visibleLifeEvents(totality), healed.incarnation.events);
  const reentered = actions(next, [{ type: 'ENTER' }, { type: 'VEIL' }, { type: 'CATALYST' }]);
  assert.equal(reentered.incarnation.phase, 'INCARNATE');
  assert.equal(reentered.incarnation.archive.length, 1);
  assert.ok(reentered.incarnation.events.every(event => !healed.incarnation.events.some(old => old.id === event.id)));
});

test('reality and perspective changes preserve identity, selected context, and history', () => {
  let life = begin();
  const id = life.incarnation.events.at(-1).id;
  life = act(life, { type: 'INSPECT_EVENT', eventId: id });
  const before = structuredClone(life);
  for (const reality of ['TIME_SPACE', 'SPACE_TIME']) for (const perspective of ['TOTALITY', 'HIGHER_SELF', 'INCARNATE_SELF']) {
    const observed = actions(life, [{ type: 'REALITY', reality }, { type: 'PERSPECTIVE', perspective }]);
    assert.deepEqual(observed.incarnation, before.incarnation);
    assert.deepEqual(observed.entity, before.entity);
    assert.equal(observed.timeSpace.selectedEventId, id);
    assert.equal(observed.timeSpace.entityId, before.timeSpace.entityId);
  }
  assert.equal(act(life, { type: 'INSPECT_EVENT', eventId: 'fabricated' }), life);
});

test('perspectives provide different information without discarding the full record', () => {
  let life = begin();
  for (let i = 0; i < 6; i++) life = act(choose(life), { type: 'CATALYST' });
  assert.equal(visibleLifeEvents(life).length, 3);
  assert.equal(visibleLifeEvents(act(life, { type: 'PERSPECTIVE', perspective: 'HIGHER_SELF' })).length, life.incarnation.events.length);
});

test('invalid stage jumps, including legacy actions, cannot fabricate a completed life', () => {
  const initial = createInitialSimulationState();
  for (const type of ['VEIL', 'CATALYST', 'DEATH', 'REVIEW', 'HEALING', 'NEXT_INCARNATION']) assert.equal(act(initial, { type }), initial);
  for (const phase of ['REVIEW', 'HEALING', 'DEATH_TRANSITION']) assert.equal(simulationReducer(initial, { type: 'SET_INCARNATION_PHASE', phase }), initial);
});

test('navigation back/forward restores the view, lens and selected object across the Phase 2 boundary', () => {
  const entity = travelNavigationState(createInitialUniverseNavigationState(), 'entity', 'entity-primary');
  const inner = travelNavigationState(entity, 'inner', 'inner-focus');
  let timeline = travelPhase3State(inner, 'timeline', 'event-1');
  timeline = { ...timeline, perspective: 'TOTALITY' };
  const higher = travelPhase3State(timeline, 'higher-self', 'pattern-1');
  const previous = backNavigationState(higher);
  assert.equal(previous.phase3View, 'timeline');
  assert.equal(previous.selectedObjectId, 'event-1');
  assert.equal(previous.perspective, 'TOTALITY');
  const next = forwardNavigationState(previous);
  assert.equal(next.phase3View, 'higher-self');
  assert.equal(next.selectedObjectId, 'pattern-1');
  assert.equal(next.perspective, 'HIGHER_SELF');
  const boundary = backNavigationState(backNavigationState(next));
  assert.equal(boundary.phase3View, null);
  assert.equal(boundary.activeScaleId, 'inner');
  assert.equal(boundary.selectedObjectId, 'inner-focus');
  assert.equal(travelPhase3State(previous, 'planning').future.length, 0);
  assert.equal(universeScales.length, 9);
  assert.deepEqual(universeScales.map(scale => scale.id), ['infinity','logos','galaxy','star','planet','civilization','entity','energy','inner']);
});

test('every Phase 3 concept, condition, and spatial view has classification and valid sources', () => {
  const classifications = ['SOURCE_BACKED', 'INFERRED', 'SIMULATION_ABSTRACTION'];
  assert.equal(phase3Concepts.length, 10);
  for (const concept of phase3Concepts) {
    assert.ok(classifications.includes(concept.classification));
    assert.ok(concept.sourceRecordIds.length);
    for (const id of concept.sourceRecordIds) {
      const source = sourceCatalog.find(record => record.id === id);
      assert.ok(source);
      assert.ok(classifications.includes(source.classification));
      assert.ok(source.implementationNote);
      if (source.classification === 'SOURCE_BACKED') assert.ok(source.references.length);
    }
  }
  for (const item of [...programFields, ...phase3Views]) assert.equal(item.sourceClassification, 'SIMULATION_ABSTRACTION');
});

test('seeded lifecycle replay is deterministic and free of input mutations', () => {
  const replay = seed => {
    let state = freeze(createInitialSimulationState(seed));
    const history = [{ type: 'ENTER' }, { type: 'VEIL' }, { type: 'CATALYST' }, { type: 'CHOOSE', actor: 'ENTITY', response: 'control' }, { type: 'CATALYST' }, { type: 'CHOOSE', actor: 'ENTITY', response: 'defer' }, { type: 'DEATH' }, { type: 'REVIEW' }, { type: 'GUIDANCE' }, { type: 'HEALING' }, { type: 'NEXT_INCARNATION' }];
    for (const action of history) state = freeze(act(state, action));
    return state;
  };
  assert.deepEqual(replay(941), replay(941));
});
