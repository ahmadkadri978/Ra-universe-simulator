import assert from 'node:assert/strict';
import { createInitialSimulationState } from '../.offline-build/simulation/state/initialState.js';
import { applyCatalyst } from '../.offline-build/simulation/rules/catalyst.js';
import { assessThirdDensityHarvest } from '../.offline-build/simulation/rules/harvest.js';
import { createDeterministicRandom } from '../.offline-build/simulation/utils/deterministicRandom.js';
import { simulationReducer } from '../.offline-build/simulation/engine/reducer.js';
import { sourceCatalog } from '../.offline-build/sources/catalog.js';
import { ontologyConcepts } from '../.offline-build/domain/ontology/concepts.js';

const initial = createInitialSimulationState(42);
assert.equal(initial.entity.currentDensity, 3);
assert.equal(initial.entity.energyCenters.length, 7);
assert.equal(initial.entity.veilActive, true);

const accepted = applyCatalyst(initial.entity, {
  id: 'test-acceptance',
  category: 'loss',
  intensity: 0.8,
  perception: 'Opportunity to integrate',
  response: 'acceptance',
});
assert.ok(accepted.polarity.serviceToOthers > initial.entity.polarity.serviceToOthers);
assert.ok(accepted.compassion > initial.entity.compassion);
assert.equal(accepted.catalystHistory.at(-1)?.response, 'acceptance');

const controlled = applyCatalyst(initial.entity, {
  id: 'test-control',
  category: 'power',
  intensity: 0.8,
  perception: 'Threat requiring domination',
  response: 'control',
});
assert.ok(controlled.polarity.serviceToSelf > initial.entity.polarity.serviceToSelf);
assert.equal(controlled.catalystHistory.at(-1)?.response, 'control');

assert.deepEqual(
  assessThirdDensityHarvest({ serviceToOthers: 0.51, serviceToSelf: 0.2, orientation: 'POSITIVE' }),
  { harvestable: true, path: 'POSITIVE', threshold: 0.51 },
);
assert.deepEqual(
  assessThirdDensityHarvest({ serviceToOthers: 0.03, serviceToSelf: 0.95, orientation: 'NEGATIVE' }),
  { harvestable: true, path: 'NEGATIVE', threshold: 0.95 },
);
assert.equal(
  assessThirdDensityHarvest({ serviceToOthers: 0.5, serviceToSelf: 0.5, orientation: 'UNPOLARIZED' }).harvestable,
  false,
);

const randomA = createDeterministicRandom(777);
const randomB = createDeterministicRandom(777);
assert.equal(randomA.next(), randomB.next());
assert.equal(randomA.next(), randomB.next());

const running = simulationReducer(initial, { type: 'CLOCK_SET_PAUSED', paused: false });
const ticked = simulationReducer(running, { type: 'CLOCK_TICK', amount: 3 });
assert.equal(ticked.clock.tick, 3);

const sourceIds = new Set(sourceCatalog.map((record) => record.id));
for (const concept of ontologyConcepts) {
  for (const sourceId of concept.sourceRecordIds) {
    assert.ok(sourceIds.has(sourceId), `${concept.id} points to missing source record ${sourceId}`);
  }
}

console.log(`Domain tests passed: ${ontologyConcepts.length} ontology concepts, ${sourceCatalog.length} source records.`);
