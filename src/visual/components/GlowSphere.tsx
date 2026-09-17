import { AdditiveBlending } from 'three';
import type { ThreeEvent } from '@react-three/fiber';

interface GlowSphereProps {
  radius: number;
  color: string;
  emissive?: string;
  position?: [number, number, number];
  intensity?: number;
  opacity?: number;
  onClick?: ((event: ThreeEvent<MouseEvent>) => void) | undefined;
}

export function GlowSphere({
  radius,
  color,
  emissive = color,
  position = [0, 0, 0],
  intensity = 1.8,
  opacity = 1,
  onClick,
}: GlowSphereProps) {
  return (
    <group position={position}>
      <mesh {...(onClick ? { onClick } : {})}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={intensity}
          roughness={0.24}
          metalness={0.04}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </mesh>
      <mesh scale={1.35}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.10 * opacity}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.75}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.035 * opacity}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight color={color} intensity={intensity * 0.65} distance={radius * 8 + 2} decay={2} />
    </group>
  );
}
