import type { EvidenceClass } from '../sources/types.js';

const labels: Record<EvidenceClass, string> = {
  SOURCE_BACKED: 'SOURCE-BACKED',
  INFERRED: 'INFERRED',
  SIMULATION_ABSTRACTION: 'SIMULATION ABSTRACTION',
};

export function EvidenceBadge({ classification }: { classification: EvidenceClass }) {
  return <span className={`evidence-badge evidence-${classification.toLowerCase()}`}>{labels[classification]}</span>;
}
