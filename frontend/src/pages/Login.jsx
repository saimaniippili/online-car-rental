import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/actions/userActions'
import Spinner from '../components/Spinner'
import premiumHeroBg from '../components/premium_hero_bg.png'

function Login() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth <= 1024;
    
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    
    function onFinish(values) {
        dispatch(userLogin(values))
        console.log(values)
    }
    
    return (
        <div style={{ background: '#050505', minHeight: '100vh', overflow: 'hidden' }}>
            {loading && (<Spinner />)}
            
            {/* Brand Logo */}
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 20 }}>
                <Link to='/' style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '2px', textDecoration: 'none' }}>
                    RENTAL<span style={{ color: 'var(--accent)' }}>SERVICE</span>
                </Link>
            </div>

            <Row style={{ minHeight: '100vh', margin: 0, flexDirection: isMobile ? 'column' : 'row' }}>
                
                {/* 3D Showcase Zone (62.5% width on desktop, 100% on mobile) */}
                <Col lg={15} md={24} sm={24} xs={24} style={{ position: 'relative', height: isMobile ? '55vh' : '100vh' }}>
                    
                    {/* Desktop Seam Blending Gradient */}
                    <div style={{
                        position: 'absolute',
                        right: 0, top: 0,
                        width: '15vw', height: '100%',
                        background: 'linear-gradient(to right, rgba(5,5,5,0) 0%, rgba(5,5,5,1) 100%)',
                        zIndex: 10, pointerEvents: 'none'
                    }} className="d-none d-lg-block"></div>

                    {/* Mobile Bottom Seam Blending Gradient */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0, left: 0,
                        width: '100%', height: '15vh',
                        background: 'linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,1) 100%)',
                        zIndex: 10, pointerEvents: 'none'
                    }} className="d-lg-none"></div>

                    {/* Subtle Cinematic Background Glow */}
                    <div style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%', height: '100%',
                        background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 60%)',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}></div>
                    <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', backgroundImage: `url(${premiumHeroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    </div>
                </Col>

                {/* Form Zone (37.5% width on desktop, 100% on mobile) */}
                <Col lg={9} md={24} sm={24} xs={24} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: isMobile ? '20px' : '40px',
                    background: '#050505',
                    zIndex: 20,
                    minHeight: isMobile ? '45vh' : '100vh'
                }}>
                    <div style={{
                        background: 'rgba(15, 15, 15, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        padding: '60px 40px',
                        borderRadius: '4px',
                        width: '100%',
                        maxWidth: '450px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.9), 0 0 25px rgba(230, 57, 70, 0.15), inset 0 0 15px rgba(230, 57, 70, 0.05)'
                    }}>
                        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.5rem', color: '#fff', marginBottom: '10px', fontWeight: 500 }}>
                            Welcome Back
                        </h1>
                        <p style={{ fontFamily: "'Inter', sans-serif", color: '#888', marginBottom: '40px', fontSize: '1rem' }}>
                            Access your extraordinary journey.
                        </p>
                        
                        <Form layout='vertical' onFinish={onFinish} requiredMark={false}>
                             <Form.Item 
                                name='email' 
                                label={<span style={{ color: '#bbb', fontFamily: "'Outfit', sans-serif", letterSpacing: '1px' }}>EMAIL</span>}
                                rules={[{required: true}]}
                             >
                                 <Input style={{ 
                                     background: 'rgba(0,0,0,0.5)', 
                                     border: '1px solid rgba(255,255,255,0.1)', 
                                     color: '#fff',
                                     padding: '12px 15px',
                                     borderRadius: '2px'
                                 }} />
                             </Form.Item>
                             
                             <Form.Item 
                                name='password' 
                                label={<span style={{ color: '#bbb', fontFamily: "'Outfit', sans-serif", letterSpacing: '1px' }}>PASSWORD</span>}
                                rules={[{required: true}]}
                             >
                                 <Input type='password' style={{ 
                                     background: 'rgba(0,0,0,0.5)', 
                                     border: '1px solid rgba(255,255,255,0.1)', 
                                     color: '#fff',
                                     padding: '12px 15px',
                                     borderRadius: '2px'
                                 }} />
                             </Form.Item>

                             <button type="submit" style={{
                                 width: '100%',
                                 background: 'var(--accent)',
                                 color: '#fff',
                                 border: 'none',
                                 padding: '15px 0',
                                 fontFamily: "'Outfit', sans-serif",
                                 fontWeight: 600,
                                 letterSpacing: '2px',
                                 textTransform: 'uppercase',
                                 marginTop: '20px',
                                 cursor: 'pointer',
                                 borderRadius: '2px',
                                 transition: 'all 0.3s ease'
                             }}
                             onMouseOver={(e) => e.target.style.background = '#d90429'}
                             onMouseOut={(e) => e.target.style.background = 'var(--accent)'}
                             >
                                 AUTHENTICATE
                             </button>

                             <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                 <p style={{ color: '#888', fontFamily: "'Inter', sans-serif" }}>
                                     Don't have an account? <br/>
                                     <Link to='/register' style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Initialize access here.</Link>
                                 </p>
                             </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Login;