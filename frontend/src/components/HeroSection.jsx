import React from 'react';
import { motion } from 'framer-motion';
import heroImage from './range_rover_hero.png';

const HeroSection = () => {
  return (
    <div 
      className="hero-container" 
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '800px',
        overflow: 'hidden',
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '60px'
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          width: '100%', 
          maxWidth: '1500px', 
          margin: '0 auto', 
          padding: '0 5%',
          height: '100%',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Left Column: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '24px',
            maxWidth: '650px',
            paddingRight: '40px'
          }}
        >
          <span style={{ color: '#E63946', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
            PREMIUM CAR RENTALS
          </span>

          <h1 
            style={{
                fontSize: 'clamp(4rem, 6.5vw, 6rem)',
                lineHeight: '1.05',
                color: '#fff',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
                margin: 0,
                letterSpacing: '-1px'
            }}
          >
            Drive the <br/> Exceptional
          </h1>

          <p 
            style={{
                fontSize: '1rem',
                color: '#A1A1AA',
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.8',
                fontWeight: 400,
                marginTop: '5px',
                marginBottom: '15px',
                maxWidth: '400px'
            }}
          >
            Experience luxury like never before. Premium cars, unmatched performance, exceptional service.
          </p>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <button className="premium-btn" style={{ padding: '16px 35px' }}>
              <span className="premium-btn-text">EXPLORE FLEET</span>
            </button>
            <button className="btn-outline" style={{ padding: '16px 35px', border: '1px solid rgba(255,255,255,0.2) !important', background: 'transparent !important', backdropFilter: 'none' }}>
              BOOK NOW
            </button>
          </div>

          {/* Reviews Mockup */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '50px' }}>
             <div style={{ display: 'flex' }}>
                <img src="https://i.pravatar.cc/150?img=11" alt="user" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #050505' }} />
                <img src="https://i.pravatar.cc/150?img=12" alt="user" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #050505', marginLeft: '-15px' }} />
                <img src="https://i.pravatar.cc/150?img=13" alt="user" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #050505', marginLeft: '-15px' }} />
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span style={{ color: '#E63946', fontSize: '1rem', letterSpacing: '2px' }}>★★★★★</span>
               <span style={{ color: '#888', fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>4.9 (2.3k+ Reviews)</span>
             </div>
          </div>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            flex: '1.2',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Subtle Backlight */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)',
            filter: 'blur(50px)',
            zIndex: 1
          }} />
          
          <img 
            src={heroImage} 
            alt="Luxury SUV" 
            style={{
              width: '130%',
              maxWidth: '1200px',
              objectFit: 'contain',
              position: 'relative',
              zIndex: 2,
              transform: 'scaleX(-1) translateX(10%) translateY(5%)', // Match screenshot positioning
              filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.8))'
            }} 
          />
        </motion.div>
      </div>

      {/* Decorative vertical lines */}
      <div style={{ position: 'absolute', top: 0, right: '25%', width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), transparent)' }}></div>
      <div style={{ position: 'absolute', top: 0, right: '5%', width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent)' }}></div>
    </div>
  );
};

export default HeroSection;
