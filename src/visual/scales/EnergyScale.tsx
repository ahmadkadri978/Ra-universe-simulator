import { useMemo } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { AdditiveBlending } from 'three';
import { FlowingArc } from '../components/FlowingArc.js';
import { GlowSphere } from '../components/GlowSphere.js';
import { ScaleLabel } from '../components/ScaleLabel.js';

interface EnergyScaleProps {
  active: boolean;
  onEnterInner: () => void;
  onInspect: () => void;
}

const centers = [
  { id: 'red', color: '#e45b4d', y: -1.55 },
  { id: 'orange', color: '#ef9446', y: -1.03 },
  { id: 'yellow', color: '#ebcb5a', y: -0.51 },
  { id: 'green', color: '#64cb92', y: 0.02 },
  { id: 'blue', color: '#62b3ed', y: 0.55 },
  { id: 'indigo', color: '#777adf', y: 1.08 },
  { id: 'violet', color: '#b98add', y: 1.61 },
] as const;

export function EnergyScale({ active, onEnterInner, onInspect }: EnergyScaleProps) {
  const path = useMemo(
    () => centers.map((center) => [0, center.y, 0] as [number, number, number]),
    [],
  );

  const enter = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onEnterInner();
  };

  return (
    <group onClick={onInspect}>
      <FlowingArc points={path} color="#d8eaff" radius={0.012} opacity={0.18} speed={0.19} particleSize={0.07} />
      {centers.map((center, index) => (
        <group key={center.id} position={[0, center.y, 0]}>
          <GlowSphere
            radius={index === 6 ? 0.16 : index === 3 ? 0.18 : 0.14}
            color={center.color}
            intensity={active ? 2.4 : 1.1}
            onClick={index === 5 || index === 6 ? enter : undefined}
          />
          <mesh rotation={[Math.PI / 2, 0, index * 0.4]}>
            <torusGeometry args={[0.33 + index * 0.018, 0.009, 5, 72]} />
            <meshBasicMaterial color={center.color} transparent opacity={0.24} blending={AdditiveBlending} />
          </mesh>
        </group>
      ))}
      <mesh onClick={enter} position={[0, 1.37, 0]}>
        <sphereGeometry args={[0.66, 28, 28]} />
        <meshBasicMaterial color="#c7b8ff" transparent opacity={0.025} blending={AdditiveBlending} />
      </mesh>
      <ScaleLabel title="ENERGY CENTERS" subtitle="relative flow visualization · numerical values remain simulation abstractions" position={[0, -2.15, 0]} active={active} />
    </group>
  );
}
