import { useMemo } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import type { ConceptId } from '../../domain/ontology/types.js';

interface ConceptNodeProps {
  conceptId: ConceptId;
  label: string;
  position: [number, number, number];
  radius?: number;
  selected?: boolean;
  onSelect: (conceptId: ConceptId) => void;
}

export function ConceptNode({
  conceptId,
  label,
  position,
  radius = 0.24,
  selected = false,
  onSelect,
}: ConceptNodeProps) {
  const emissiveIntensity = useMemo(() => (selected ? 2.4 : 1.1), [selected]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(conceptId);
  };

  return (
    <group position={position} userData={{ conceptId, label }}>
      <mesh onClick={handleClick} scale={selected ? 1.16 : 1}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={selected ? '#f4df9a' : '#a8c8ff'}
          emissive={selected ? '#d7a63a' : '#386cb8'}
          emissiveIntensity={emissiveIntensity}
          roughness={0.32}
          metalness={0.08}
        />
      </mesh>
      <pointLight intensity={selected ? 2.4 : 0.8} distance={3.5} decay={2} />
    </group>
  );
}
