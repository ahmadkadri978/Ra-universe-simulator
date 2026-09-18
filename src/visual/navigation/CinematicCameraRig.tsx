import { useEffect, useMemo, useRef } from 'react';
import type { ComponentRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { getUniverseScale } from './universeGraph.js';
import { useUniverseNavigation } from './useUniverseNavigation.js';
import { getPhase3View } from './phase3Views.js';
import { useDisplayQuality } from '../components/useDisplayQuality.js';

export function CinematicCameraRig() {
  const camera = useThree((state) => state.camera);
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const activeScaleId = useUniverseNavigation((state) => state.activeScaleId);
  const traveling = useUniverseNavigation((state) => state.traveling);
  const finishTravel = useUniverseNavigation((state) => state.finishTravel);
  const phase3View = useUniverseNavigation((state) => state.phase3View);
  const { compact, reducedMotion } = useDisplayQuality();
  const scale = getUniverseScale(activeScaleId);
  const definition = phase3View ? getPhase3View(phase3View) : scale;

  const target = useMemo(() => new Vector3(...definition.anchor), [definition]);
  const goalPosition = useMemo(
    () => new Vector3(
      definition.anchor[0] + definition.cameraOffset[0],
      definition.anchor[1] + definition.cameraOffset[1],
      definition.anchor[2] + definition.cameraOffset[2] * (phase3View && compact ? 1.28 : 1),
    ),
    [definition, compact, phase3View],
  );
  const refocusing = useRef(false);
  useEffect(() => { refocusing.current = true; }, [goalPosition]);

  useFrame((_, delta) => {
    const orbit = controls.current;
    if (!orbit) return;

    if (traveling || refocusing.current) {
      const alpha = 1 - Math.exp(-delta * (reducedMotion ? 12 : 2.25));
      camera.position.lerp(goalPosition, alpha);
      orbit.target.lerp(target, alpha);
      camera.lookAt(orbit.target);

      if (camera.position.distanceTo(goalPosition) < 0.045 && orbit.target.distanceTo(target) < 0.03) {
        camera.position.copy(goalPosition);
        orbit.target.copy(target);
        orbit.update();
        refocusing.current = false;
        finishTravel();
      }
    }
  });

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.055}
      enablePan={false}
      minDistance={phase3View ? 7 : scale.orbitMinDistance}
      maxDistance={phase3View ? 24 : scale.orbitMaxDistance}
      enabled={!traveling}
      rotateSpeed={0.52}
      zoomSpeed={0.68}
    />
  );
}
