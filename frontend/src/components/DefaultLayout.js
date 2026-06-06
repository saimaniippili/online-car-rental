import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest' };
  const [scrolled, setScrolled] = useState(false);

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
        <div className="brand-logo">
          <Link to='/'>Lusso<span>Motors</span></Link>
        </div>
        
        <div>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button className="user-badge-btn" icon={<UserOutlined />}>
              {user.username}
            </Button>
          </Dropdown>
        </div>
      </header>

      <main className="content">
        {props.children}
      </main>

      <footer className="luxury-footer">
        <Row justify="center" gutter={[32, 32]}>
          <Col xs={24} md={8} style={{ textAlign: 'left' }}>
            <div className="brand-logo mb-3" style={{ fontSize: '1.2rem' }}>
              Lusso<span>Motors</span>
            </div>
            <p style={{ fontSize: '0.9rem', maxWidth: '300px' }}>
              Experience world-class luxury vehicles engineered for unforgettable journeys. The premium automotive rental platform.
            </p>
          </Col>
          <Col xs={12} md={4} style={{ textAlign: 'left' }}>
            <h4 style={{ fontFamily: 'Outfit', fontSize: '1.1rem', letterSpacing: '1px', marginBottom: '20px' }}>EXPLORE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="/#fleet">Fleet</a>
              <a href="/#reviews">Reviews</a>
              {user.username !== 'Guest' && <Link to="/userbookings">Bookings</Link>}
            </div>
          </Col>
          <Col xs={12} md={4} style={{ textAlign: 'left' }}>
            <h4 style={{ fontFamily: 'Outfit', fontSize: '1.1rem', letterSpacing: '1px', marginBottom: '20px' }}>LEGAL</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="#">Terms of Service</Link>
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Cookie Policy</Link>
            </div>
          </Col>
        </Row>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px', paddingTop: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          &copy; {new Date().getFullYear()} Lusso Motors Premium Automotive. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default DefaultLayout;
