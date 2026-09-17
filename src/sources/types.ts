export type EvidenceClass = 'SOURCE_BACKED' | 'INFERRED' | 'SIMULATION_ABSTRACTION';

export interface SourceReference {
  session: number;
  question: number | string;
  note: string;
}

export interface SourceRecord {
  id: string;
  conceptId: string;
  title: string;
  classification: EvidenceClass;
  summary: string;
  references: SourceReference[];
  implementationNote?: string;
}
