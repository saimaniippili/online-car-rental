import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LuxuryCard = ({ car, handleReserve, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(10, 10, 10, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isHovered ? '1px solid rgba(230, 57, 70, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '2px',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(230,57,70,0.05)' : 'none',
      }}
    >
      {/* Soft Ambient Spotlight */}
      <div style={{
          position: 'absolute',
          top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%', height: '80%',
          background: 'radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 1s ease',
          pointerEvents: 'none',
          zIndex: 1
      }}></div>

      <div className="img-container" style={{ height: '220px', position: 'relative', marginBottom: '30px', background: 'transparent', zIndex: 2 }}>
          {/* Smooth Color Bloom Car Image */}
          <img 
              src={car.image} 
              alt={car.name} 
              style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  filter: isHovered ? 'grayscale(0%) brightness(100%) drop-shadow(0 20px 20px rgba(0,0,0,0.8))' : 'grayscale(100%) brightness(80%) drop-shadow(0 10px 10px rgba(0,0,0,0.5))',
                  transform: isHovered ? 'translateY(-15px) scale(1.05)' : 'translateY(0px) scale(1)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
          />
      </div>

      <div className="car-content text-center" style={{ position: 'relative', zIndex: 5 }}>
          
          <h3 style={{ 
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.8rem', 
              letterSpacing: '1px', 
              color: isHovered ? '#ffffff' : '#aaaaaa',
              margin: '0 0 5px 0',
              fontWeight: 600,
              transition: 'color 0.8s ease'
          }}>
              {car.name}
          </h3>
          
          <p style={{ 
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem', 
              letterSpacing: '3px', 
              color: isHovered ? 'var(--accent)' : '#666666', 
              textTransform: 'uppercase',
              margin: '0 0 20px 0',
              fontWeight: 500,
              transition: 'color 0.8s ease'
          }}>
              PREMIUM {car.fuelType}
          </p>

          {/* Minimalist Divider */}
          <div style={{ 
              width: isHovered ? '40px' : '20px', 
              height: '1px', 
              background: isHovered ? 'var(--accent)' : 'rgba(255,255,255,0.1)', 
              margin: '0 auto 25px auto',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}></div>

          <p style={{ 
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.4rem', 
              margin: '0 0 25px 0', 
              color: isHovered ? 'var(--text-primary)' : '#888888',
              fontWeight: 500,
              transition: 'color 0.8s ease'
          }}>
              ₹{car.rentPerHour} <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: isHovered ? 'var(--text-secondary)' : '#666666', fontWeight: 400, transition: 'color 0.8s ease' }}>/ Hour</span>
          </p>
          
          {/* Smooth Slide-Up Reserve Button */}
          <div style={{
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? 'auto' : 'none',
              transform: isHovered ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
          }}>
              <Link to={`/booking/${car._id}`} onClick={(e) => handleReserve(e, car._id)}>
                  <button style={{ 
                      width: '100%', 
                      background: 'transparent',
                      color: '#ffffff',
                      border: '1px solid var(--accent)',
                      borderRadius: '2px',
                      padding: '12px 20px',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                  }}
                  onMouseOver={(e) => e.target.style.background = 'var(--accent)'}
                  onMouseOut={(e) => e.target.style.background = 'transparent'}
                  >
                      RESERVE VEHICLE
                  </button>
              </Link>
          </div>
      </div>
    </motion.div>
  );
};

export default LuxuryCard;
