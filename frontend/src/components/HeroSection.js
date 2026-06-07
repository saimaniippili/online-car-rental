import React from 'react';
import { motion } from 'framer-motion';
import premiumBg from './premium_hero_bg.png';

const HeroSection = () => {
  return (
    <div 
      className="hero-container" 
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        background: '#050505'
      }}
    >
      {/* Background Image with Parallax-ish Scale */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${premiumBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      {/* Gradient Overlay for Text Readability */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.6) 40%, rgba(5,5,5,0.1) 100%)',
          zIndex: 1
        }}
      />
      
      {/* Cinematic Vignette */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* Content */}
      <div 
        className="hero-content" 
        style={{ 
          position: 'relative',
          zIndex: 10,
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          height: '100%',
          padding: '0 8%',
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px',
            maxWidth: '650px'
          }}
        >
          {/* Elegant Top Kicker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
              style={{ height: '2px', backgroundColor: '#E63946' }}
            />
            <span style={{ color: '#E63946', fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
              The Ultimate Driving Experience
            </span>
          </div>

          {/* Massive, Sleek Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            className="hero-title"
            style={{
                fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                lineHeight: '1.05',
                color: '#fff',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                margin: 0,
                letterSpacing: '-1px'
            }}
          >
            REDEFINE <br/>
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>LUXURY</span>
          </motion.h1>

          {/* Elegant Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="hero-subtitle"
            style={{
                fontSize: '1.15rem',
                color: '#A1A1AA',
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.7',
                fontWeight: 300,
                marginTop: '10px',
                marginBottom: '30px'
            }}
          >
            Experience the pinnacle of automotive engineering. Choose from our world-class luxury fleet and <span style={{ color: '#fff', fontStyle: 'italic', fontWeight: 400 }}>elevate your journey</span> to unforgettable heights.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <button 
              className="premium-btn"
              onClick={() => {
                const fleet = document.getElementById('fleet');
                if (fleet) fleet.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="premium-btn-text">Explore The Fleet</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
