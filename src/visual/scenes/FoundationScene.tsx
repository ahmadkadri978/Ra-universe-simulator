import { OrbitControls, Stars } from '@react-three/drei';
import type { ConceptId } from '../../domain/ontology/types.js';
import { ConceptNode } from '../components/ConceptNode.js';

interface FoundationSceneProps {
  selectedConceptId: ConceptId | null;
  onSelectConcept: (conceptId: ConceptId) => void;
}

const backbone: Array<{
  id: ConceptId;
  label: string;
  position: [number, number, number];
  radius: number;
}> = [
  { id: 'intelligent_infinity', label: 'Intelligent Infinity', position: [0, 2.4, 0], radius: 0.4 },
  { id: 'free_will', label: 'Free Will', position: [-1.8, 1.2, 0.2], radius: 0.28 },
  { id: 'logos_love', label: 'Love / Logos', position: [0, 0.9, 0], radius: 0.34 },
  { id: 'light', label: 'Light', position: [1.8, 1.2, -0.2], radius: 0.28 },
  { id: 'creation', label: 'Creation', position: [0, -0.3, 0], radius: 0.4 },
  { id: 'density', label: 'Densities', position: [0, -1.7, 0], radius: 0.32 },
  { id: 'mind_body_spirit_complex', label: 'Entity', position: [0, -3.0, 0], radius: 0.28 },
];

function Link({ a, b }: { a: [number, number, number]; b: [number, number, number] }) {
  const midpoint: [number, number, number] = [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
    (a[2] + b[2]) / 2,
  ];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const angle = Math.atan2(dx, dy);

  return (
    <mesh position={midpoint} rotation={[0, 0, -angle]}>
      <cylinderGeometry args={[0.018, 0.018, length, 8]} />
      <meshBasicMaterial color="#355276" transparent opacity={0.6} />
    </mesh>
  );
}

export function FoundationScene({ selectedConceptId, onSelectConcept }: FoundationSceneProps) {
  return (
    <>
      <color attach="background" args={['#040711']} />
      <fog attach="fog" args={['#040711', 8, 18]} />
      <ambientLight intensity={0.36} />
      <directionalLight position={[4, 6, 7]} intensity={0.75} />
      <Stars radius={50} depth={18} count={900} factor={2.2} saturation={0} fade speed={0.25} />

      {backbone.slice(0, -1).map((node, index) => {
        const next = backbone[index + 1];
        return next ? <Link key={`${node.id}-${next.id}`} a={node.position} b={next.position} /> : null;
      })}

      {backbone.map((node) => (
        <ConceptNode
          key={node.id}
          conceptId={node.id}
          label={node.label}
          position={node.position}
          radius={node.radius}
          selected={selectedConceptId === node.id}
          onSelect={onSelectConcept}
        />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={13}
        dampingFactor={0.06}
        enableDamping
        target={[0, -0.3, 0]}
      />
    </>
  );
}
