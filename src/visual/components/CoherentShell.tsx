import { AdditiveBlending } from 'three';

interface CoherentShellProps {
  radius: number;
  color: string;
  opacity?: number;
}

export function CoherentShell({ radius, color, opacity = 0.055 }: CoherentShellProps) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 44, 44]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={opacity}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
