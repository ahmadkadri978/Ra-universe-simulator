import { useEffect, useRef } from 'react';
import type { ConceptId } from '../../domain/ontology/types.js';
import { SourceInspector } from '../SourceInspector.js';
export function SourceDialog({ conceptId, onClose }: { conceptId: ConceptId; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; if (dialog && !dialog.open) dialog.showModal(); }, []);
  return <dialog ref={ref} className="source-modal" aria-label="Source inspector" onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <button className="source-close" autoFocus onClick={onClose}>Close ×</button>
    <SourceInspector conceptId={conceptId} />
  </dialog>;
}
