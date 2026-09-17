import { ontologyConcepts } from '../domain/ontology/concepts.js';
import type { ConceptId } from '../domain/ontology/types.js';
import { getSourceRecord } from '../sources/selectors.js';
import { EvidenceBadge } from './EvidenceBadge.js';

export function SourceInspector({ conceptId }: { conceptId: ConceptId | null }) {
  const concept = ontologyConcepts.find((item) => item.id === conceptId);

  if (!concept) {
    return (
      <aside className="source-inspector source-inspector-empty">
        <p>Select a concept in the scene to inspect its provenance.</p>
      </aside>
    );
  }

  const records = concept.sourceRecordIds
    .map((id) => getSourceRecord(id))
    .filter((record) => record !== undefined);

  return (
    <aside className="source-inspector">
      <div className="inspector-heading-row">
        <div>
          <span className="eyebrow">SOURCE INSPECTOR</span>
          <h2>{concept.name}</h2>
        </div>
        <EvidenceBadge classification={concept.classification} />
      </div>
      <p className="concept-description">{concept.shortDescription}</p>

      <div className="source-records">
        {records.map((record) => (
          <section key={record.id} className="source-record">
            <div className="source-record-title">
              <strong>{record.title}</strong>
              <EvidenceBadge classification={record.classification} />
            </div>
            <p>{record.summary}</p>
            <div className="reference-list">
              {record.references.map((reference) => (
                <div key={`${reference.session}-${reference.question}`} className="reference-chip">
                  <span>Session {reference.session}.{reference.question}</span>
                  <small>{reference.note}</small>
                </div>
              ))}
            </div>
            {record.implementationNote ? (
              <div className="implementation-note">
                <strong>Implementation note</strong>
                <span>{record.implementationNote}</span>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </aside>
  );
}
