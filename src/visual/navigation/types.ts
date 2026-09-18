import type { ConceptId } from '../../domain/ontology/types.js';
import type { EvidenceClass } from '../../sources/types.js';
import type { Phase3View } from './phase3Views.js';
import type { PerspectiveMode } from '../../domain/timeSpace/types.js';

export type UniverseScaleId =
  | 'infinity'
  | 'logos'
  | 'galaxy'
  | 'star'
  | 'planet'
  | 'civilization'
  | 'entity'
  | 'energy'
  | 'inner';

export type Vec3Tuple = readonly [number, number, number];

export interface UniverseScaleDefinition {
  id: UniverseScaleId;
  index: number;
  label: string;
  shortLabel: string;
  description: string;
  ontologyConceptId: ConceptId;
  representationClass: EvidenceClass;
  parentId: UniverseScaleId | null;
  childId: UniverseScaleId | null;
  anchor: Vec3Tuple;
  cameraOffset: Vec3Tuple;
  orbitMinDistance: number;
  orbitMaxDistance: number;
  visualIntent: string;
}

export interface UniverseNavigationState {
  activeScaleId: UniverseScaleId;
  history: UniverseScaleId[];
  selectedObjectId: string | null;
  traveling: boolean;
  journeyProgress: number;
  phase3View: Phase3View | null;
  perspective: PerspectiveMode;
  past: NavigationContext[];
  future: NavigationContext[];
}

export interface NavigationContext {
  activeScaleId: UniverseScaleId;
  phase3View: Phase3View | null;
  perspective: PerspectiveMode;
  selectedObjectId: string | null;
  history: UniverseScaleId[];
  journeyProgress: number;
}
