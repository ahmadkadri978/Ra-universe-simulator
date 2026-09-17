import { useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { AdditiveBlending, Group } from 'three';
import { GlowSphere } from '../components/GlowSphere.js';
import { ScaleLabel } from '../components/ScaleLabel.js';

interface StarScaleProps {
  active: boolean;
  onEnterPlanet: () => void;
  onInspect: () => void;
}

const orbitData = [
  { radius: 1.25, size: 0.07, phase: 0.4 },
  { radius: 1.85, size: 0.10, phase: 2.2 },
  { radius: 2.55, size: 0.15, phase: 4.4 },
] as const;

export function StarScale({ active, onEnterPlanet, onInspect }: StarScaleProps) {
  const orbits = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (orbits.current) orbits.current.rotation.y = clock.elapsedTime * 0.08;
  });

  const enter = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onEnterPlanet();
  };

  return (
    <group onClick={onInspect}>
      <GlowSphere radius={0.72} color="#ffd785" emissive="#ffad3d" intensity={4.4} />
      <mesh scale={1.55}>
        <sphereGeometry args={[0.72, 28, 28]} />
        <meshBasicMaterial color="#ffc45d" transparent opacity={0.055} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <group ref={orbits}>
        {orbitData.map((orbit, index) => {
          const position: [number, number, number] = [
            Math.cos(orbit.phase) * orbit.radius,
            0,
            Math.sin(orbit.phase) * orbit.radius,
          ];
          return (
            <group key={orbit.radius}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[orbit.radius, 0.008, 5, 96]} />
                <meshBasicMaterial color="#6f86a8" transparent opacity={0.22} />
              </mesh>
              <GlowSphere
                radius={orbit.size}
                color={index === 2 ? '#76b9ff' : '#aabbd3'}
                intensity={index === 2 ? 1.8 : 0.7}
                position={position}
                onClick={index === 2 ? enter : undefined}
              />
            </group>
          );
        })}
      </group>
      <ScaleLabel title="STAR / SUB-LOGOS SCALE" subtitle="follow the highlighted planetary field" position={[0, -2.35, 0]} active={active} />
    </group>
  );
}
