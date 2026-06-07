import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LuxuryCard = ({ car, handleReserve, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#ffffff',
        border: '1px solid #eaeaea',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        transition: 'all 0.4s ease',
        boxShadow: isHovered ? '0 15px 35px rgba(0,0,0,0.06)' : '0 4px 10px rgba(0,0,0,0.02)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
      }}
    >
      <div className="img-container" style={{ height: '180px', position: 'relative', marginBottom: '20px', background: 'transparent' }}>
          <img 
              src={car.image} 
              alt={car.name} 
              style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
          />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'left' }}>
              <h3 style={{ 
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.25rem', 
                  color: '#111',
                  margin: '0 0 4px 0',
                  fontWeight: 600,
                  letterSpacing: '-0.5px'
              }}>
                  {car.name}
              </h3>
              
              <p style={{ 
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem', 
                  margin: '0', 
                  color: '#111',
                  fontWeight: 600,
              }}>
                  ₹{car.rentPerHour} <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 400 }}>/ hr</span>
              </p>
          </div>
          
          <Link to={`/booking/${car._id}`} onClick={(e) => handleReserve(e, car._id)}>
              <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: isHovered ? '#111' : '#f4f4f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
              }}>
                  <span style={{ color: isHovered ? '#fff' : '#111', fontSize: '1.2rem', lineHeight: 1 }}>→</span>
              </div>
          </Link>
      </div>
    </motion.div>
  );
};

export default LuxuryCard;
