import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, MeshReflectorMaterial, PerspectiveCamera } from '@react-three/drei';
import CarModel from './CarModel';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveredTitle, setIsHoveredTitle] = useState(false);
  const [isHoveredLeftBtn, setIsHoveredLeftBtn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const isMobile = windowWidth <= 1024;
  const carScale = isMobile ? [1.3, 1.3, 1.3] : (windowWidth <= 1280 ? [1.5, 1.5, 1.5] : [1.8, 1.8, 1.8]);
  const carPosition = isMobile ? [0, -0.6, 0] : (windowWidth <= 1280 ? [1.5, -0.6, 0] : [3, -0.5, 0]);

  return (
    <div className="hero-container" onMouseMove={handleMouseMove}>
      
      {/* Cinematic Content Overlay - Comes FIRST so it stacks on top for mobile */}
      <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', pointerEvents: 'none' }}>
        <motion.div style={{ pointerEvents: 'auto', perspective: '1000px' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '20px',
              maxWidth: '800px'
            }}
          >
            {/* Elegant Top Kicker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                style={{ height: '2px', backgroundColor: '#E63946' }}
              />
              <span style={{ color: '#A1A1AA', fontFamily: "'Syncopate', sans-serif", fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
                Premium Car Rental Experience
              </span>
            </div>

            {/* Massive, Sleek Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
              className="hero-title"
            >
              DRIVE <br/>
              <span style={{ color: 'transparent', WebkitTextStroke: '2px #E63946' }}>EXTRAORDINARY</span>
            </motion.h1>

            {/* Elegant Subtitle */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="hero-subtitle"
            >
              Experience the <span style={{ color: '#fff', fontWeight: 500 }}>pinnacle of automotive engineering</span>. Choose from our world-class luxury fleet and <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 500 }}>elevate your journey</span> to unforgettable heights.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ display: 'flex', width: '100%', maxWidth: '550px', zIndex: 100, marginTop: '20px', pointerEvents: 'auto' }}
          >
            {/* Primary Minimalist Button */}
            <button 
              style={{
                position: 'relative',
                width: '100%',
                padding: '16px 40px',
                background: '#E63946',
                color: '#fff',
                border: 'none',
                minHeight: '48px',
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.8rem',
                letterSpacing: '3px',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                boxShadow: isHoveredLeftBtn ? '0 10px 30px rgba(230,57,70,0.4)' : 'none',
                transform: isHoveredLeftBtn ? 'translateY(-2px)' : 'none',
                overflow: 'hidden'
              }}
              onMouseEnter={() => setIsHoveredLeftBtn(true)}
              onMouseLeave={() => setIsHoveredLeftBtn(false)}
              onClick={() => {
                const fleet = document.getElementById('fleet');
                if (fleet) fleet.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>Explore Fleet</span>
              {/* Subtle hover gleam */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'all 0.5s ease',
                transform: isHoveredLeftBtn ? 'translateX(200%)' : 'translateX(0)'
              }} />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Canvas Background - Comes SECOND so it stacks below content on mobile */}
      <div className="hero-canvas" style={{ touchAction: 'pan-y' }}>
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[5, 2, 8]} fov={45} />
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 10, 20]} />
          
          <ambientLight intensity={0.2} />
          <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
          <directionalLight position={[-10, 10, -5]} intensity={1} />
          
          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <CarModel position={carPosition} scale={carScale} rotation={[0, -Math.PI / 4, 0]} />
            </Float>
            
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" position={[carPosition[0], -0.6, 0]} />

            {/* Reflection Floor */}
            <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[50, 50]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
              />
            </mesh>
            
          </Suspense>
          
          {/* enableRotate is true by default, enablePan=false, enableZoom=false */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2 - 0.05} 
            minPolarAngle={Math.PI / 3}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Dynamic Ambient Cursor Glow */}
      {!isMobile && (
        <motion.div 
            animate={{ 
                x: mousePosition.x - 400, 
                y: mousePosition.y - 400 
            }}
            transition={{ type: "spring", stiffness: 30, damping: 20, mass: 0.8 }}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '800px', height: '800px',
                background: 'radial-gradient(circle, rgba(230,57,70,0.06) 0%, transparent 60%)',
                pointerEvents: 'none',
                zIndex: 1,
                filter: 'blur(40px)',
                mixBlendMode: 'screen'
            }}
        />
      )}
    </div>
  );
};

export default HeroSection;
