import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest' };
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menu = (
    <Menu className="luxury-menu" theme="dark" style={{ background: '#111', border: '1px solid #333' }}>
      <Menu.Item key="1">
        <a href="/#home">Home</a>
      </Menu.Item>
      {user.username !== 'Guest' && (
        <Menu.Item key="2">
          <Link to="/userbookings">My Bookings</Link>
        </Menu.Item>
      )}
      {user.username === 'Guest' ? (
        <Menu.Item key="5" onClick={()=>{
            window.location.href='/login'
        }}>
            <span style={{color:'var(--accent)', fontWeight: '600'}}>Login</span>
        </Menu.Item>
      ) : (
        <Menu.Item key="5" onClick={()=>{
            localStorage.removeItem('user');
            window.location.href='/'
        }}>
            <span style={{color:'var(--accent)', fontWeight: '600'}}>Logout</span>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div>
      <header className={`luxury-header ${scrolled ? 'scrolled' : ''}`}>
        {/* Left: Logo */}
        <div className="brand-logo" style={{ flex: 1 }}>
          <Link to='/' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem', color: '#fff' }}>R</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px', color: '#fff', paddingTop: '4px' }}>RENTALSERVICE</span>
          </Link>
        </div>
        
        {/* Center: Nav Links */}
        <div className="nav-links" style={{ display: 'none', flex: 2, justifyContent: 'center', gap: '40px' }}>
          <a href="/#home" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', opacity: location.pathname === '/' && location.hash === '#home' ? 1 : 0.6 }}>Home</a>
          <a href="/#fleet" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', opacity: location.hash === '#fleet' ? 1 : 0.6 }}>Fleet</a>
          <a href="/#services" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6 }}>Services</a>
          <a href="/#about" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6 }}>About Us</a>
          <a href="/#contact" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6 }}>Contact</a>
        </div>

        {/* Right: Book Now / User */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Dropdown overlay={menu} placement="bottomRight">
            <button className="nav-book-btn">
              {user.username === 'Guest' ? 'BOOK NOW' : user.username}
            </button>
          </Dropdown>
        </div>
      </header>

      <main className="content">
        {props.children}
      </main>

      <footer className="luxury-footer">
        <Row justify="center" gutter={[32, 32]}>
          <Col xs={24} md={8} style={{ textAlign: 'left' }}>
            <div className="brand-logo mb-3" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>R</span> <span style={{ fontSize: '0.7rem' }}>RENTALSERVICE</span>
            </div>
            <p style={{ fontSize: '0.9rem', maxWidth: '300px' }}>
              Experience world-class luxury vehicles engineered for unforgettable journeys. The premium automotive rental platform.
            </p>
          </Col>
          <Col xs={12} md={4} style={{ textAlign: 'left' }}>
            <h4 style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', letterSpacing: '1px', marginBottom: '20px' }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="/#fleet">Fleet</a>
              <a href="/#reviews">Reviews</a>
              {user.username !== 'Guest' && <Link to="/userbookings">Bookings</Link>}
            </div>
          </Col>
          <Col xs={12} md={4} style={{ textAlign: 'left' }}>
            <h4 style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', letterSpacing: '1px', marginBottom: '20px' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="#">Terms of Service</Link>
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Cookie Policy</Link>
            </div>
          </Col>
        </Row>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px', paddingTop: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} RentalService Premium Automotive. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default DefaultLayout;
