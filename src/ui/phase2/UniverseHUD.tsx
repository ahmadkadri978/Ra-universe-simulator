import { EvidenceBadge } from '../EvidenceBadge.js';
import { getScalePath, getUniverseScale, universeScales } from '../../visual/navigation/universeGraph.js';
import { useUniverseNavigation } from '../../visual/navigation/useUniverseNavigation.js';

export function UniverseHUD() {
  const activeScaleId = useUniverseNavigation((state) => state.activeScaleId);
  const history = useUniverseNavigation((state) => state.history);
  const traveling = useUniverseNavigation((state) => state.traveling);
  const journeyProgress = useUniverseNavigation((state) => state.journeyProgress);
  const travelTo = useUniverseNavigation((state) => state.travelTo);
  const back = useUniverseNavigation((state) => state.back);
  const reset = useUniverseNavigation((state) => state.reset);

  const active = getUniverseScale(activeScaleId);
  const path = getScalePath(activeScaleId);
  const next = active.childId ? getUniverseScale(active.childId) : null;

  return (
    <>
      <div className="universe-hud-top glass-panel">
        <div className="hud-brand">
          <span className="eyebrow">PHASE 2 · CONTINUOUS UNIVERSE</span>
          <strong>Ra Ontology Simulator</strong>
        </div>
        <div className="hud-scale-status">
          <small>{traveling ? 'TRAVELING' : 'FOCUSED SCALE'}</small>
          <b>{active.label}</b>
        </div>
        <div className="hud-actions">
          <button className="icon-button" onClick={back} disabled={history.length === 0 && active.parentId === null}>← Back</button>
          <button className="icon-button secondary" onClick={reset}>Reset view</button>
        </div>
      </div>

      <nav className="universe-breadcrumb glass-panel" aria-label="Universe scale path">
        {path.map((scaleId, index) => {
          const scale = getUniverseScale(scaleId);
          return (
            <button
              key={scaleId}
              className={scaleId === activeScaleId ? 'active' : ''}
              onClick={() => travelTo(scaleId, `breadcrumb-${scaleId}`)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {scale.shortLabel}
            </button>
          );
        })}
      </nav>

      <section className="universe-story glass-panel">
        <div className="story-heading-row">
          <div>
            <span className="eyebrow">{String(active.index + 1).padStart(2, '0')} / {String(universeScales.length).padStart(2, '0')}</span>
            <h2>{active.label}</h2>
          </div>
          <EvidenceBadge classification={active.representationClass} />
        </div>
        <p>{active.description}</p>
        <div className="visual-intent">
          <span>Visual intent</span>
          <strong>{active.visualIntent}</strong>
        </div>
        {next ? (
          <button className="continue-button" onClick={() => travelTo(next.id, `continue-${next.id}`)}>
            Continue inward <b>{next.shortLabel} →</b>
          </button>
        ) : (
          <div className="journey-end">Innermost Phase 2 scale reached. Phase 3 will extend this space into Higher Self / time-space structures.</div>
        )}
      </section>

      <div className="journey-meter" aria-label="Continuous zoom progress">
        <i style={{ transform: `scaleX(${Math.max(0.015, journeyProgress)})` }} />
      </div>
    </>
  );
}
