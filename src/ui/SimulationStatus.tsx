import { assessThirdDensityHarvest } from '../simulation/rules/harvest.js';
import type { SimulationState } from '../simulation/state/types.js';

export function SimulationStatus({ state }: { state: SimulationState }) {
  const harvest = assessThirdDensityHarvest(state.entity.polarity);

  return (
    <section className="simulation-status">
      <span className="eyebrow">SIMULATION CORE</span>
      <div className="metric-grid">
        <div>
          <small>Density</small>
          <strong>{state.entity.currentDensity}</strong>
        </div>
        <div>
          <small>STO</small>
          <strong>{Math.round(state.entity.polarity.serviceToOthers * 100)}%</strong>
        </div>
        <div>
          <small>STS</small>
          <strong>{Math.round(state.entity.polarity.serviceToSelf * 100)}%</strong>
        </div>
        <div>
          <small>Harvest</small>
          <strong>{harvest.harvestable ? harvest.path : 'Not yet'}</strong>
        </div>
      </div>
      <p>
        Phase 1 deliberately keeps visuals restrained. The production boundary between ontology, simulation,
        source evidence, and rendering is the deliverable here.
      </p>
    </section>
  );
}
