import assert from 'node:assert/strict';
import {
  getScaleIndex,
  getScalePath,
  getScaleProgress,
  getUniverseScale,
  universeScaleOrder,
  universeScales,
} from '../.phase2-build/visual/navigation/universeGraph.js';
import {
  backNavigationState,
  canTravelDirectly,
  createInitialUniverseNavigationState,
  finishTravel,
  travelNavigationState,
} from '../.phase2-build/visual/navigation/navigationLogic.js';

assert.equal(universeScales.length, 9, 'Phase 2 must expose nine continuous scales.');
assert.deepEqual(universeScaleOrder, ['infinity','logos','galaxy','star','planet','civilization','entity','energy','inner']);

for (let index = 0; index < universeScales.length; index += 1) {
  const scale = universeScales[index];
  assert.ok(scale, `Missing scale ${index}.`);
  assert.equal(scale.index, index, `${scale.id} index must match ordering.`);
  assert.equal(scale.parentId, index === 0 ? null : universeScales[index - 1]?.id ?? null);
  assert.equal(scale.childId, index === universeScales.length - 1 ? null : universeScales[index + 1]?.id ?? null);
  assert.ok(scale.cameraOffset[2] > 0, `${scale.id} camera must sit in front of its focus anchor.`);
  assert.ok(scale.orbitMinDistance > 0 && scale.orbitMaxDistance > scale.orbitMinDistance, `${scale.id} orbit bounds invalid.`);
  assert.equal(scale.representationClass, 'SIMULATION_ABSTRACTION', `${scale.id} geometry must not be mislabeled as doctrine.`);
  if (index > 0) {
    assert.ok(scale.anchor[2] < universeScales[index - 1].anchor[2], 'Scale anchors must move continuously inward along the world spine.');
  }
}

assert.equal(getScaleIndex('planet'), 4);
assert.deepEqual(getScalePath('entity'), ['infinity','logos','galaxy','star','planet','civilization','entity']);
assert.equal(getScaleProgress('infinity'), 0);
assert.equal(getScaleProgress('inner'), 1);
assert.equal(getUniverseScale('energy').ontologyConceptId, 'mind_body_spirit_complex');

let nav = createInitialUniverseNavigationState();
assert.equal(nav.activeScaleId, 'infinity');
assert.equal(nav.traveling, false);
nav = travelNavigationState(nav, 'logos', 'first-asymmetry');
assert.equal(nav.activeScaleId, 'logos');
assert.deepEqual(nav.history, ['infinity']);
assert.equal(nav.selectedObjectId, 'first-asymmetry');
assert.equal(nav.traveling, true);
nav = finishTravel(nav);
assert.equal(nav.traveling, false);
nav = travelNavigationState(nav, 'galaxy');
nav = travelNavigationState(nav, 'star');
assert.deepEqual(nav.history, ['infinity','logos','galaxy']);
nav = backNavigationState(nav);
assert.equal(nav.activeScaleId, 'galaxy');
nav = travelNavigationState(nav, 'infinity');
assert.equal(nav.activeScaleId, 'infinity');
assert.equal(nav.history.length, 0);

assert.equal(canTravelDirectly('planet', 'civilization'), true);
assert.equal(canTravelDirectly('planet', 'star'), true);
assert.equal(canTravelDirectly('planet', 'inner'), false);
assert.equal(canTravelDirectly('energy', 'logos'), true, 'Back navigation may jump to an ancestor scale.');

console.log('Phase 2 navigation tests passed.');
