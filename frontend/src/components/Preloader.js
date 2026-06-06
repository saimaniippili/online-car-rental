import React, { useState, useEffect, useRef } from 'react';
import { motion, animate, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const speedRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const animation = animate(0, 320, { 
      duration: 2.2, 
      ease: "circOut",
      onUpdate: (latest) => {
        if (speedRef.current) {
          speedRef.current.textContent = Math.round(latest);
        }
      }
    });
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, 2800);

    return () => {
      animation.stop();
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(circle at center, #111 0%, #030303 100%)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff'
          }}
        >
          {/* Ambient Glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
               position: 'absolute',
               width: '800px',
               height: '800px',
               background: 'radial-gradient(circle, #E63946 0%, transparent 60%)',
               filter: 'blur(80px)',
               zIndex: 0,
               pointerEvents: 'none'
            }}
          />

          {/* Speedometer Graphics */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '450px', position: 'relative', height: '225px', overflow: 'visible', marginBottom: '60px', zIndex: 1 }}
          >
            <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="needleGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#E63946" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Background Arc */}
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" strokeLinecap="round" />
              
              {/* Tick Marks (More detailed for premium look) */}
              {Array.from({ length: 41 }).map((_, i) => {
                  const tick = i * 2.5; // 0 to 100
                  const angle = Math.PI - (tick / 100) * Math.PI;
                  const isMajor = tick % 20 === 0;
                  const isMedium = tick % 10 === 0;
                  const rInner = isMajor ? 65 : (isMedium ? 70 : 74);
                  const x1 = 100 + Math.cos(angle) * rInner;
                  const y1 = 100 - Math.sin(angle) * rInner;
                  const x2 = 100 + Math.cos(angle) * 80;
                  const y2 = 100 - Math.sin(angle) * 80;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isMajor ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)"} strokeWidth={isMajor ? "2" : "1"} />
              })}

              {/* Digital LED Redline Fill (Segmented) */}
              <motion.path 
                  d="M 20 100 A 80 80 0 0 1 180 100" 
                  fill="none" 
                  stroke="#E63946" 
                  strokeWidth="8" 
                  strokeLinecap="butt"
                  strokeDasharray="2 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.2, ease: "circOut" }}
                  style={{ filter: 'url(#glow)' }}
              />
              
              {/* Needle Hub */}
              <circle cx="100" cy="100" r="8" fill="#0A0A0A" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <circle cx="100" cy="100" r="3" fill="#E63946" style={{ filter: 'url(#glow)' }} />
              
              {/* Needle */}
              <motion.g
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 90 }}
                  transition={{ duration: 2.2, ease: "circOut" }}
                  style={{ transformOrigin: '100px 100px' }}
              >
                  <polygon points="98.5,100 101.5,100 100,25" fill="url(#needleGrad)" style={{ filter: 'url(#glow)' }} />
              </motion.g>
            </svg>
            
            {/* Digital Speed Readout */}
            <div style={{ position: 'absolute', bottom: '-45px', left: '0', right: '0', textAlign: 'center' }}>
                <div style={{ 
                    fontSize: '2.5rem', 
                    fontFamily: "'Outfit', sans-serif", 
                    color: '#E63946', 
                    letterSpacing: '2px',
                    fontWeight: 900,
                    textShadow: '0 0 30px rgba(230,57,70,0.6)'
                }}>
                  <span ref={speedRef}>0</span> <span style={{ fontSize: '0.4em', opacity: 0.6, color: '#fff', fontWeight: 400, letterSpacing: '4px' }}>KM/H</span>
                </div>
            </div>
          </motion.div>

          {/* Preloader Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ textAlign: 'center', marginTop: '20px', zIndex: 1 }}
          >
             <motion.h2 
                animate={{ letterSpacing: ['2px', '8px'] }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                style={{ fontSize: '1.2rem', color: '#ffffff', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 600 }}
             >
                Fasten Your Seatbelts
             </motion.h2>
             <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', letterSpacing: '4px', textTransform: 'uppercase' }}>
                Preparing for arrival
             </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
