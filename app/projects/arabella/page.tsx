'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';
import * as THREE from 'three';
import { CursorPointer } from 'iconoir-react';
import { motion } from 'framer-motion';

function Shader(props: any) {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const texture = useLoader(THREE.TextureLoader, '/arabella.jpg');
  const { viewport } = useThree();
  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += 0.01;
      shaderRef.current.uniforms.uPointer.value = state.pointer;
      shaderRef.current.uniforms.uOutputResolution.value.set(
        viewport.width,
        viewport.height
      );
      shaderRef.current.uniforms.uTextureResolution.value.set(
        texture.image.width,
        texture.image.height
      );
    }
  });

  return (
    <mesh {...props}>
      <planeGeometry args={[viewport.width, viewport.height, 10]} />
      <shaderMaterial
        ref={shaderRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{
          uTime: { value: 0.0 },
          uPointer: { value: new THREE.Vector2(0.5, 0.5) },
          uTexture: { value: texture },
          uOutputResolution: {
            value: new THREE.Vector2(viewport.width, viewport.height),
          },
          uTextureResolution: {
            value: new THREE.Vector2(texture.image.width, texture.image.height),
          },
        }}
      />
    </mesh>
  );
}

export default function Home() {
  return (
    <main className="h-screen flex bg-slate-100">
      <div className="h-full w-1/2">
        <Canvas orthographic>
          <ambientLight intensity={Math.PI / 2} />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Suspense fallback={null}>
            <Shader props={{ position: [0, 0, 0] }} />
          </Suspense>
        </Canvas>
      </div>
      <div className="h-full w-1/2 flex flex-col justify-between p-12">
        <div className="overflow-hidden">
          <motion.h1
            className="text-9xl text-slate-800 font-light transform translate-y-full"
            animate={{
              y: ['120%', '0%'],
              rotateZ: [6, 0],
              transition: { duration: 0.5, easings: ['easeInOut'], delay: 0.5 },
            }}
          >
            Arabella
          </motion.h1>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="p-2 rounded-full bg-blue-500">
            <CursorPointer className="text-blue-50" />
          </div>
          <p className="text-slate-500">
            Drag your mouse around the image to see the effect.
          </p>
        </div>
      </div>
    </main>
  );
}
