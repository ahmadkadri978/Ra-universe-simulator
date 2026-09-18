import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, Float32BufferAttribute, Group, DoubleSide } from 'three';

function Ribbon({ layer, totality }: { layer: number; totality: boolean }) {
  const geometry = useMemo(() => {
    const positions: number[] = []; const indices: number[] = [];
    for (let i = 0; i <= 64; i++) {
      const t = i / 64; const x = (t - 0.5) * 10;
      for (const side of [-1, 1]) positions.push(x, Math.sin(t * Math.PI * 1.5 + layer * 0.37) * 0.9 + layer * 0.38 - 1.4 + side * 0.09, Math.cos(t * Math.PI * 2 + layer * 0.22) * 0.7 - 1.6);
      if (i < 64) { const a = i * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals(); return g;
  }, [layer]);
  return <mesh geometry={geometry} rotation={[totality ? 0.28 : 0, 0, totality ? layer * 0.015 : 0]}>
    <meshBasicMaterial color={layer % 3 === 0 ? '#cbb187' : '#83aaa9'} transparent opacity={totality ? 0.16 : 0.1} side={DoubleSide} depthWrite={false} />
  </mesh>;
}
export function InformationAtlas({ totality, reducedMotion, compact }: { totality: boolean; reducedMotion: boolean; compact: boolean }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => { if (ref.current && !reducedMotion) ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.07; });
  return <group ref={ref} userData={{ sourceClassification: 'SIMULATION_ABSTRACTION', conceptId: 'perspective_lenses' }}>
    {Array.from({ length: totality ? (compact ? 9 : 14) : 7 }, (_, i) => <Ribbon key={i} layer={i} totality={totality} />)}
  </group>;
}
