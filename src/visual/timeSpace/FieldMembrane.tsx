import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, DoubleSide } from 'three';

const vertexShader = `varying vec2 vUv; uniform float time; void main(){ vUv=uv; vec3 p=position; p.z += sin(p.x*.45+time*.12)*cos(p.y*.65-time*.08)*.38; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); }`;
const fragmentShader = `varying vec2 vUv; uniform vec3 tint; uniform float time; void main(){vec2 uv=vUv-.5; float edge=pow(max(0.,1.-length(uv)*1.75),3.); float weave=.48+.22*sin(vUv.y*70.+sin(vUv.x*11.+time*.12)*2.); gl_FragColor=vec4(tint,edge*weave*.11);}`;
export function FieldMembrane({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const uniforms = useMemo(() => ({ time: { value: 0 }, tint: { value: new Color('#86a9aa') } }), []);
  useFrame(({ clock }) => { if (!reducedMotion) uniforms.time.value = clock.elapsedTime; });
  return active ? <mesh position={[0, 0, -2]} userData={{ sourceClassification: 'SIMULATION_ABSTRACTION', conceptId: 'visual_weights' }}>
    <planeGeometry args={[17, 11, 28, 20]} />
    <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} side={DoubleSide} />
  </mesh> : null;
}
