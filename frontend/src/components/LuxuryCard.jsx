import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const LuxuryCard = ({ car, handleReserve, index }) => {
  const ref = useRef(null);
  
  // Motion values for the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid movement
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform coordinates to rotation angles (max 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Dynamic glow effect that follows the mouse
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(y, [-0.5, 0, 0.5], [0.4, 0, 0.4]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Mouse position relative to element center (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        perspective: 1500, // Essential for 3D depth
        transformStyle: 'preserve-3d',
        height: '100%'
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          background: '#ffffff',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}
      >
        {/* Dynamic glare overlay for realistic 3D lighting */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            opacity: glareOpacity,
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.8) 0%, transparent 80%)`,
            mixBlendMode: 'overlay'
          }}
        />

        <div style={{ position: 'relative', paddingTop: '65%', overflow: 'hidden', background: '#f5f5f5' }}>
          {/* Subtle pop-out effect for the image on tilt */}
          <motion.img 
            src={car.image} 
            alt={car.name} 
            style={{ 
              position: 'absolute', 
              top: 0, left: 0, width: '100%', height: '100%', 
              objectFit: 'cover',
              transform: 'translateZ(30px) scale(1.05)' // 3D pop out
            }} 
          />
        </div>
        
        <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1, transform: 'translateZ(40px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', fontWeight: 600, color: '#111', margin: '0 0 5px 0' }}>{car.name}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#888', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>
                {car.fuelType}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 600, color: '#111' }}>
                ${car.rentPerHour}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#888' }}>/ day</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', fontSize: '0.9rem', color: '#666', fontFamily: "'Inter', sans-serif" }}>
             <span>💺 {car.capacity} Seats</span>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
            <Link to={`/booking/${car._id}`} onClick={handleReserve} style={{ flexGrow: 1, textDecoration: 'none' }}>
              <button style={{ 
                width: '100%', 
                padding: '12px 0', 
                background: '#111', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '2px', 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '0.85rem', 
                fontWeight: 600, 
                letterSpacing: '1px', 
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'var(--accent)'}
              onMouseOut={(e) => e.target.style.background = '#111'}
              >
                RESERVE NOW
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LuxuryCard;
