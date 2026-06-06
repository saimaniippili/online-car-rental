import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col } from 'antd';
import { motion } from 'framer-motion';

function Review() {
    return (
        <DefaultLayout>
            <div style={{ background: '#050505', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px', color: 'var(--text-primary)' }}>
                <div className="section-padding" style={{ paddingTop: '40px' }}>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '60px', letterSpacing: '2px' }}>
                        THE <span style={{ color: 'var(--accent)' }}>EXPERIENCE</span>
                    </h1>
                    
                    <Row justify="center" gutter={[48, 48]}>
                        <Col lg={16} sm={24}>
                            <motion.div 
                                className="luxury-card p-5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                style={{ background: 'rgba(15, 15, 15, 0.7)', border: '1px solid #333', textAlign: 'center', marginBottom: '80px' }}
                            >
                                <h3 style={{ fontSize: '2rem', letterSpacing: '1px', marginBottom: '20px' }}>Our Philosophy</h3>
                                <div style={{ width: '60px', height: '2px', background: 'var(--accent)', margin: '0 auto 30px auto' }}></div>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                                    We believe that every journey should be an unforgettable masterpiece. Our platform is meticulously crafted to provide you with the ultimate luxury automotive experience, combining a hand-picked inventory of the world's finest vehicles with a seamless, white-glove digital reservation process. From compact solo exotics to commanding luxury SUVs, we ensure your vehicle is flawlessly detailed and performance-ready the moment you receive the keys.
                                </p>
                            </motion.div>
                        </Col>
                    </Row>

                    <h2 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '50px', letterSpacing: '2px' }}>CLIENT REVIEWS</h2>
                    
                    <Row justify="center" gutter={[32, 32]}>
                        {[
                            { name: "James W.", quote: "An unforgettable weekend. The Aston Martin was in absolutely pristine condition, and the delivery service was completely flawless. Highly recommended." },
                            { name: "Sarah L.", quote: "The only way to rent luxury cars. The seamless digital booking process perfectly matches the ultra-premium feel of the vehicles themselves." },
                            { name: "Michael T.", quote: "I’ve used many premium rental services across the globe, and none compare to the attention to detail and immaculate fleet presented here." },
                            { name: "Elena R.", quote: "From the moment I clicked 'Reserve' to the moment I handed the keys back, the experience was pure perfection. The G-Wagon exceeded all expectations." }
                        ].map((review, idx) => (
                            <Col lg={12} sm={24} key={idx}>
                                <motion.div 
                                    className="glass-card"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                                    style={{ padding: '40px', borderLeft: '4px solid var(--accent)', background: 'linear-gradient(90deg, rgba(230,57,70,0.05) 0%, transparent 100%)', height: '100%' }}
                                >
                                    <p style={{ fontStyle: 'italic', fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '30px', color: '#fff' }}>"{review.quote}"</p>
                                    <h5 style={{ margin: 0, color: 'var(--accent)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>— {review.name}</h5>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Review;