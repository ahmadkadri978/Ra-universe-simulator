import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector2 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export function SoftBloom() {
  const { gl, scene, camera, size } = useThree();
  const composer = useMemo(() => {
    const result = new EffectComposer(gl); result.setPixelRatio(1);
    result.addPass(new RenderPass(scene, camera));
    result.addPass(new UnrealBloomPass(new Vector2(640, 400), 0.23, 0.55, 0.72));
    result.addPass(new OutputPass());
    return result;
  }, [gl, scene, camera]);
  useEffect(() => { composer.setSize(size.width, size.height); }, [composer, size]);
  useEffect(() => () => { composer.passes.forEach((pass) => pass.dispose()); composer.dispose(); }, [composer]);
  useFrame((_, delta) => composer.render(delta), 1);
  return null;
}
