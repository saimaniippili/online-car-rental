import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function CarModel(props) {
  const group = useRef();
  const { scene } = useGLTF('/3d-assets/source/aston_martin_v8_vantage_v600.glb');
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/3d-assets/source/aston_martin_v8_vantage_v600.glb');
