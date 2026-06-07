import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from './range_rover_hero.png';

const HeroSection = () => {
  const containerRef = useRef(null);
  
  // Advanced scroll parallax setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms based on scroll
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Stagger variants for the heading text
  const sentence = "Drive the Exceptional";
  const letters = sentence.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i }
    })
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="hero-container" 
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#020202',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        perspective: '1000px'
      }}
    >
      {/* Background ambient lighting */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(230, 57, 70, 0.15) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
        
        {/* Left Column: Typography */}
        <motion.div 
          style={{ flex: '1 1 50%', padding: '0 5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', y: textY, opacity: textOpacity }}
        >
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}
          >
            <div style={{ width: '40px', height: '1px', background: 'var(--accent)' }}></div>
            <span style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '3px', fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase' }}>
              Premium Car Rental
            </span>
          </motion.div>

          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', 
              fontWeight: 500, 
              color: '#fff', 
              lineHeight: 1.05, 
              margin: '0 0 30px 0',
              display: 'flex',
              flexWrap: 'wrap',
              perspective: '1000px'
            }}
          >
            {letters.map((letter, index) => (
              <motion.span key={index} variants={letterVariants} style={{ display: letter === " " ? "inline" : "inline-block" }}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: '#888', maxWidth: '450px', marginBottom: '40px', lineHeight: 1.6 }}
          >
            Experience the thrill of the world's most exclusive luxury vehicles, delivered directly to you.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
          >
            <button style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                padding: '16px 36px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                letterSpacing: '1px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(230, 57, 70, 0.3)'
              }}
              onMouseOver={(e) => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 15px 40px rgba(230, 57, 70, 0.4)'; }}
              onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 10px 30px rgba(230, 57, 70, 0.3)'; }}
            >
              EXPLORE FLEET
            </button>
            <button style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '16px 36px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                letterSpacing: '1px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }}
              onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            >
              BOOK NOW
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Parallax Image */}
        <motion.div 
          style={{ 
            flex: '1 1 50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative',
            y: imageY,
            scale: imageScale
          }}
        >
          {/* Decorative Circle behind car */}
          <motion.div
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             style={{
                 position: 'absolute',
                 width: '80%',
                 paddingBottom: '80%',
                 borderRadius: '50%',
                 border: '1px solid rgba(255,255,255,0.05)',
                 zIndex: 0
             }}
          />
          <motion.img 
            initial={{ opacity: 0, x: 100, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            src={heroImage} 
            alt="Luxury SUV" 
            style={{ 
              width: '120%', 
              maxWidth: '900px', 
              position: 'relative', 
              zIndex: 1,
              marginLeft: '-10%', // Pull it left to overlap text slightly for depth
              filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5))'
            }} 
          />
        </motion.div>
        
      </div>
    </div>
  );
};

export default HeroSection;
