import type { ConceptId } from '../../domain/ontology/types.js';
import { UniverseSpine } from '../effects/UniverseSpine.js';
import { CinematicCameraRig } from '../navigation/CinematicCameraRig.js';
import { universeScales } from '../navigation/universeGraph.js';
import { useUniverseNavigation } from '../navigation/useUniverseNavigation.js';
import { CivilizationScale } from '../scales/CivilizationScale.js';
import { EnergyScale } from '../scales/EnergyScale.js';
import { EntityScale } from '../scales/EntityScale.js';
import { GalaxyScale } from '../scales/GalaxyScale.js';
import { InfinityScale } from '../scales/InfinityScale.js';
import { InnerScale } from '../scales/InnerScale.js';
import { LogosScale } from '../scales/LogosScale.js';
import { PlanetScale } from '../scales/PlanetScale.js';
import { StarScale } from '../scales/StarScale.js';

interface ContinuousUniverseSceneProps {
  onSelectConcept: (conceptId: ConceptId) => void;
}

export function ContinuousUniverseScene({ onSelectConcept }: ContinuousUniverseSceneProps) {
  const activeScaleId = useUniverseNavigation((state) => state.activeScaleId);
  const travelTo = useUniverseNavigation((state) => state.travelTo);

  return (
    <>
      <color attach="background" args={['#02050b']} />
      <fog attach="fog" args={['#02050b', 6, 22]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 7]} intensity={0.55} color="#a9c9ff" />
      <pointLight position={[0, 2, -19]} intensity={7} distance={11} color="#d8aa55" />

      <UniverseSpine />

      {universeScales.map((scale) => (
        <group key={scale.id} position={scale.anchor as unknown as [number, number, number]}>
          {scale.id === 'infinity' ? (
            <InfinityScale
              active={activeScaleId === 'infinity'}
              onEnterLogos={() => travelTo('logos', 'first-asymmetry')}
              onInspectFreeWill={() => onSelectConcept('free_will')}
            />
          ) : null}
          {scale.id === 'logos' ? (
            <LogosScale
              active={activeScaleId === 'logos'}
              onEnterGalaxy={() => travelTo('galaxy', 'logos-focus')}
              onInspect={() => onSelectConcept('logos_love')}
            />
          ) : null}
          {scale.id === 'galaxy' ? (
            <GalaxyScale
              active={activeScaleId === 'galaxy'}
              onEnterStar={() => travelTo('star', 'stellar-locus')}
              onInspect={() => onSelectConcept('creation')}
            />
          ) : null}
          {scale.id === 'star' ? (
            <StarScale
              active={activeScaleId === 'star'}
              onEnterPlanet={() => travelTo('planet', 'planetary-locus')}
              onInspect={() => onSelectConcept('creation')}
            />
          ) : null}
          {scale.id === 'planet' ? (
            <PlanetScale
              active={activeScaleId === 'planet'}
              onEnterCivilization={() => travelTo('civilization', 'civilization-locus')}
              onInspectDensity={() => onSelectConcept('density')}
            />
          ) : null}
          {scale.id === 'civilization' ? (
            <CivilizationScale
              active={activeScaleId === 'civilization'}
              onEnterEntity={() => travelTo('entity', 'entity-primary')}
              onInspect={() => onSelectConcept('social_memory_complex')}
            />
          ) : null}
          {scale.id === 'entity' ? (
            <EntityScale
              active={activeScaleId === 'entity'}
              onEnterEnergy={() => travelTo('energy', 'entity-energy-core')}
              onInspect={() => onSelectConcept('mind_body_spirit_complex')}
            />
          ) : null}
          {scale.id === 'energy' ? (
            <EnergyScale
              active={activeScaleId === 'energy'}
              onEnterInner={() => travelTo('inner', 'inner-gateway')}
              onInspect={() => onSelectConcept('mind_body_spirit_complex')}
            />
          ) : null}
          {scale.id === 'inner' ? (
            <InnerScale active={activeScaleId === 'inner'} onInspect={() => onSelectConcept('catalyst')} />
          ) : null}
        </group>
      ))}

      <CinematicCameraRig />
    </>
  );
}
