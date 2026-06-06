import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, Float, MeshReflectorMaterial, SpotLight, Stars } from '@react-three/drei';

function Model(props) {
  const { scene } = useGLTF('/3d-assets/jeep-gladiator/source/jeep_gladiator.glb');
  return <primitive object={scene} scale={0.85} position={[0, -1.35, 0]} {...props} />;
}

// Custom component to animate the spotlight intensity
function AnimatedSpotlight() {
  const lightRef = useRef();
  
  useFrame(({ clock }) => {
    if (lightRef.current) {
      // Subtle pulsing between intensity 2.5 and 3.5
      lightRef.current.intensity = 3 + Math.sin(clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <SpotLight
      ref={lightRef}
      position={[0, 10, 0]}
      angle={0.4}
      penumbra={0.8}
      intensity={3}
      castShadow
      color="#ffffff"
      distance={20}
      volumetric
      attenuation={10}
      anglePower={5}
    />
  );
}

// Background LED strips
function ShowroomLEDs() {
  return (
    <group position={[0, 0, -8]}>
      {/* Left Red LED */}
      <mesh position={[-4, 2, 0]}>
        <boxGeometry args={[0.1, 6, 0.1]} />
        <meshBasicMaterial color={[5, 0, 0]} toneMapped={false} />
      </mesh>
      {/* Right White LED */}
      <mesh position={[4, 2, 0]}>
        <boxGeometry args={[0.1, 6, 0.1]} />
        <meshBasicMaterial color={[2, 2, 2]} toneMapped={false} />
      </mesh>
      
      {/* Faint geometric wall panel lines */}
      <mesh position={[0, 2, -0.5]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial color="#020202" />
      </mesh>
    </group>
  );
}

export default function JeepModel({ height = '100vh' }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const timeoutRef = useRef(null);

  const handleStart = () => {
    setAutoRotate(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAutoRotate(true);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      style={{ width: '100%', height, position: 'relative', background: 'transparent', cursor: 'grab', touchAction: 'pan-y' }} 
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'} 
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      {/* 
        Background must match hero exactly. 
        Canvas transparent, container handles no background so the global #050505 shows. 
      */}
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 8], fov: 45 }}>
        {/* Fog perfectly matched to the hero background color #050505 */}
        <fog attach="fog" args={['#050505', 5, 15]} />
        <color attach="background" args={['#050505']} />

        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 5, 10]} intensity={0.2} />
        
        {/* Subtle red rim light from behind */}
        <spotLight position={[0, 2, -5]} angle={0.5} penumbra={1} intensity={2} color="var(--accent)" />
        
        <Suspense fallback={null}>
          <OrbitControls
            target={[0, -0.5, 0]}
            enablePan={false}
            enableZoom={false}
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
            enableDamping={true}
            dampingFactor={0.05}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2 - 0.05}
            onStart={handleStart}
            onEnd={handleEnd}
          />
          
          <group position={[0, 0, 0]}>
            <ShowroomLEDs />
            <AnimatedSpotlight />
            
            <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.05}>
              <Model />
            </Float>

            {/* Floating dust particles simulated using Stars */}
            <Stars radius={20} depth={10} count={500} factor={2} saturation={0} fade speed={1.5} />
            
            {/* Intense contact shadows right under the tires */}
            <ContactShadows position={[0, -1.79, 0]} opacity={0.9} scale={10} blur={1} far={2} color="#000000" />
            
            {/* Glossy dark showroom floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
              <planeGeometry args={[50, 50]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={10} /* 20-30% feeling */
                roughness={0.8}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#0a0a0a"
                metalness={0.5}
              />
            </mesh>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/3d-assets/jeep-gladiator/source/jeep_gladiator.glb');
