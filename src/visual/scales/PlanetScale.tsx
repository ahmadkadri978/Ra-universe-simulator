import { useMemo, useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { AdditiveBlending, Group } from 'three';
import { CoherentShell } from '../components/CoherentShell.js';
import { FragmentedRing } from '../components/FragmentedRing.js';
import { GlowSphere } from '../components/GlowSphere.js';
import { ScaleLabel } from '../components/ScaleLabel.js';
import { mulberry32 } from '../utils/seeded.js';

interface PlanetScaleProps {
  active: boolean;
  onEnterCivilization: () => void;
  onInspectDensity: () => void;
}

export function PlanetScale({ active, onEnterCivilization, onInspectDensity }: PlanetScaleProps) {
  const planet = useRef<Group>(null);
  const cityPositions = useMemo(() => {
    const random = mulberry32(445);
    return Array.from({ length: 34 }, () => {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(1 - random() * 0.72);
      const radius = 1.31;
      return [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      ] as [number, number, number];
    });
  }, []);

  useFrame(({ clock }) => {
    if (planet.current) planet.current.rotation.y = clock.elapsedTime * 0.035;
  });

  const enter = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onEnterCivilization();
  };

  return (
    <group>
      <group ref={planet} onClick={onInspectDensity}>
        <mesh>
          <sphereGeometry args={[1.28, 72, 72]} />
          <meshStandardMaterial color="#173f56" emissive="#0a2030" emissiveIntensity={0.7} roughness={0.72} metalness={0.04} />
        </mesh>
        <mesh scale={1.055}>
          <sphereGeometry args={[1.28, 52, 52]} />
          <meshBasicMaterial color="#77cbff" transparent opacity={0.08} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
        {cityPositions.map((position, index) => (
          <GlowSphere
            key={`${position.join('-')}-${index}`}
            radius={index === 4 ? 0.035 : 0.018}
            color={index === 4 ? '#f0cd7d' : '#87c7d9'}
            position={position}
            intensity={index === 4 ? 2.5 : 0.55}
            onClick={index === 4 ? enter : undefined}
          />
        ))}
      </group>

      <group rotation={[0.3, 0.1, 0]} onClick={onInspectDensity}>
        <FragmentedRing radius={1.72} color="#edb35a" segments={24} opacity={active ? 0.46 : 0.22} />
        <FragmentedRing radius={1.86} color="#6b94d8" segments={17} opacity={0.24} rotation={[1.25, 0.4, 0.2]} />
      </group>
      <CoherentShell radius={2.25} color="#c9e6ff" opacity={active ? 0.055 : 0.025} />

      <ScaleLabel title="PLANETARY FIELD" subtitle="D3 is shown fragmented; D6 as a coherent reference shell — visual metaphors" position={[0, -2.0, 0]} active={active} />
    </group>
  );
}
