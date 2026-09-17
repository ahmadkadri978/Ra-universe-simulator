import { sourceCatalog } from './catalog.js';
import type { EvidenceClass, SourceRecord } from './types.js';

export const getSourceRecord = (id: string): SourceRecord | undefined =>
  sourceCatalog.find((record) => record.id === id);

export const getSourcesForConcept = (conceptId: string): readonly SourceRecord[] =>
  sourceCatalog.filter((record) => record.conceptId === conceptId);

export const getSourcesByClassification = (classification: EvidenceClass): readonly SourceRecord[] =>
  sourceCatalog.filter((record) => record.classification === classification);
