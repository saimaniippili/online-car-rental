/* eslint-disable */

import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row, message } from 'antd'
import {Link} from 'react-router-dom'
import Spinner from '../components/Spinner';
import HeroSection from '../components/HeroSection'
import { motion } from 'framer-motion'
import LuxuryCard from '../components/LuxuryCard'

function Home() {
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalCars , setTotalcars] = useState([])
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {
        setTotalcars(cars)
    }, [cars])

    function handleReserve(e) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.username === 'Guest') {
            e.preventDefault();
            message.info('Please login or create an account to reserve a vehicle.');
            setTimeout(() => {
                window.location.href = '/login';
            }, 500);
        }
    }

    return (
        <DefaultLayout>
            <div id="home">
                  <HeroSection />

                  <div id="fleet" className="content-container" style={{ background: 'linear-gradient(180deg, #050505 0%, #000000 100%)', paddingBottom: '0', position: 'relative' }}>
                      <div className="section-padding" style={{ paddingBottom: '20px', position: 'relative', zIndex: 3 }}>
                          <h2 className="hero-title" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '40px' }}>Our Elite Fleet</h2>
                      </div>

                      {loading == true && (<Spinner/>)}

                      <Row justify='center' gutter={[24, 24]}>
                           {totalCars.map((car, index)=>{
                               return <Col lg={8} md={12} sm={24} xs={24} key={car._id}>
                                   <LuxuryCard car={car} handleReserve={handleReserve} index={index} />
                               </Col>
                           })}
                      </Row>
                      <div className="section-padding" style={{ backgroundColor: '#020202', marginTop: '100px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                          <h2 className="hero-title" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '80px', letterSpacing: '2px' }}>WHY CHOOSE US</h2>
                          <Row gutter={[32, 32]} justify="center" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                              
                              {[
                                  {
                                      num: "01",
                                      title: "Immaculate Fleet",
                                      desc: "Every vehicle is meticulously maintained, detailed, and inspected to ensure a flawless experience before the keys touch your hands."
                                  },
                                  {
                                      num: "02",
                                      title: "White-Glove Service",
                                      desc: "From seamless digital booking to personalized vehicle delivery, our concierge team handles every single detail with ultimate precision."
                                  },
                                  {
                                      num: "03",
                                      title: "Unmatched Power",
                                      desc: "Experience the raw thrill and prestige of the world's most powerful, highly-engineered machines directly at your fingertips."
                                  }
                              ].map((feature, idx) => (
                                  <Col xs={24} lg={8} key={idx}>
                                      <motion.div 
                                          initial={{ opacity: 0, y: 40 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                                          style={{
                                              position: 'relative',
                                              background: 'rgba(15, 15, 15, 0.4)',
                                              backdropFilter: 'blur(20px)',
                                              border: '1px solid rgba(255, 255, 255, 0.03)',
                                              padding: '60px 40px',
                                              borderRadius: '2px',
                                              overflow: 'hidden',
                                              height: '100%',
                                              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                              cursor: 'default'
                                          }}
                                          onMouseOver={(e) => {
                                              e.currentTarget.style.background = 'rgba(20, 20, 20, 0.8)';
                                              e.currentTarget.style.borderColor = 'rgba(230, 57, 70, 0.3)';
                                              e.currentTarget.style.transform = 'translateY(-10px)';
                                              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(230,57,70,0.05)';
                                              const num = e.currentTarget.querySelector('.watermark-num');
                                              if(num) num.style.color = 'rgba(230, 57, 70, 0.15)';
                                          }}
                                          onMouseOut={(e) => {
                                              e.currentTarget.style.background = 'rgba(15, 15, 15, 0.4)';
                                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.03)';
                                              e.currentTarget.style.transform = 'translateY(0)';
                                              e.currentTarget.style.boxShadow = 'none';
                                              const num = e.currentTarget.querySelector('.watermark-num');
                                              if(num) num.style.color = 'rgba(255, 255, 255, 0.02)';
                                          }}
                                      >
                                          {/* Giant Watermark Number */}
                                          <div style={{
                                              position: 'absolute',
                                              top: '-20px',
                                              right: '-10px',
                                              fontSize: 'clamp(6rem, 20vw, 12rem)',
                                              fontFamily: "'Outfit', sans-serif",
                                              fontWeight: 900,
                                              color: 'rgba(255, 255, 255, 0.02)',
                                              lineHeight: 1,
                                              pointerEvents: 'none',
                                              zIndex: 1,
                                              transition: 'color 0.6s ease'
                                          }}
                                          className="watermark-num"
                                          >{feature.num}</div>
                                          
                                          <div style={{ position: 'relative', zIndex: 2 }}>
                                              <div style={{ width: '40px', height: '2px', background: 'var(--accent)', marginBottom: '40px' }}></div>
                                              <h4 style={{ fontSize: '1.8rem', marginBottom: '20px', letterSpacing: '1px', fontFamily: "'Outfit', sans-serif", color: '#fff', fontWeight: 500 }}>
                                                  {feature.title}
                                              </h4>
                                              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#777', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                                                  {feature.desc}
                                              </p>
                                          </div>
                                      </motion.div>
                                  </Col>
                              ))}
                              
                          </Row>
                      </div>

                      <div id="reviews" className="section-padding" style={{ backgroundColor: '#020202', borderTop: '1px solid rgba(255,255,255,0.05)', paddingBottom: '100px', position: 'relative' }}>
                          
                          {/* Subtle Cinematic Spotlight */}
                          <div style={{
                              position: 'absolute',
                              top: '10%', left: '50%',
                              transform: 'translateX(-50%)',
                              width: '80vw', height: '80vw',
                              background: 'radial-gradient(circle, rgba(230,57,70,0.05) 0%, transparent 60%)',
                              pointerEvents: 'none',
                              zIndex: 1
                          }}></div>

                          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
                              <h2 className="hero-title" style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '60px', letterSpacing: '6px', color: 'var(--accent)', fontFamily: "'Inter', sans-serif", fontWeight: 500, textTransform: 'uppercase' }}>The Experience</h2>
                              
                              <Row justify="center" className="mb-5">
                                  <Col lg={20} sm={24}>
                                      <motion.div 
                                          initial={{ opacity: 0, y: 40 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                          style={{ padding: '0 20px' }}
                                      >
                                          {/* Massive Editorial Pull Quote */}
                                          <h3 style={{ 
                                              fontFamily: "'Outfit', sans-serif", 
                                              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                                              fontWeight: 300, 
                                              color: '#ffffff', 
                                              lineHeight: '1.2', 
                                              marginBottom: '80px',
                                              textAlign: 'center'
                                          }}>
                                              "Every journey should be an <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 400 }}>unforgettable masterpiece.</span>"
                                          </h3>
                                          
                                          {/* Two-Column Philosophy Split */}
                                          <Row gutter={[60, 40]} style={{ marginBottom: '60px' }}>
                                              <Col xs={24} md={12}>
                                                  <p style={{ fontSize: '1.15rem', lineHeight: '1.9', color: '#888', fontFamily: "'Inter', sans-serif", fontWeight: 300, margin: 0 }}>
                                                      Our platform is meticulously crafted to provide you with the ultimate luxury automotive experience, combining a hand-picked inventory of the world's finest vehicles with a seamless, white-glove digital reservation process.
                                                  </p>
                                              </Col>
                                              <Col xs={24} md={12}>
                                                  <p style={{ fontSize: '1.15rem', lineHeight: '1.9', color: '#888', fontFamily: "'Inter', sans-serif", fontWeight: 300, margin: 0 }}>
                                                      From compact solo exotics to commanding luxury SUVs, we ensure your vehicle is flawlessly detailed and performance-ready the moment you receive the keys. We don't just rent cars; we curate the extraordinary.
                                                  </p>
                                              </Col>
                                          </Row>

                                          {/* Faux Signature Finish */}
                                          <div style={{ textAlign: 'right', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
                                              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', color: '#fff', margin: 0, fontStyle: 'italic', fontWeight: 300, opacity: 0.9 }}>
                                                  — The Elite Fleet Concierge
                                              </p>
                                          </div>
                                      </motion.div>
                                  </Col>
                              </Row>

                              <h2 className="hero-title" style={{ fontSize: '1.2rem', textAlign: 'center', margin: '120px 0 60px 0', letterSpacing: '6px', color: 'var(--accent)', fontFamily: "'Inter', sans-serif", fontWeight: 500, textTransform: 'uppercase' }}>Client Reviews</h2>
                              <Row gutter={[32, 32]} justify="center">
                              {[
                                  { name: "Arjun K.", quote: "Booked the G-Wagon for a weekend getaway. The car was completely spotless and delivery was right on time. Honestly, the smoothest rental experience I've had in a long time." },
                                  { name: "Priya S.", quote: "I was a bit skeptical about renting luxury cars online, but the whole process was so seamless. The team handled everything perfectly and the car was an absolute dream to drive." },
                                  { name: "Rohan M.", quote: "Rented an exotic for my brother's wedding. The car definitely stole the show! It looked brand new out of the showroom, and the concierge was incredibly helpful from start to finish." },
                                  { name: "Vikram D.", quote: "You really get what you pay for here. The attention to detail is insane—the car was flawlessly detailed before it even got to my driveway. Highly recommend them." }
                              ].map((review, idx) => (
                                  <Col xs={24} md={12} key={idx}>
                                      <motion.div 
                                          initial={{ opacity: 0, y: 30 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                          style={{
                                              position: 'relative',
                                              background: 'rgba(10, 10, 10, 0.4)',
                                              backdropFilter: 'blur(20px)',
                                              border: '1px solid rgba(255, 255, 255, 0.03)',
                                              padding: '50px 40px',
                                              borderRadius: '2px',
                                              height: '100%',
                                              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                              overflow: 'hidden',
                                              cursor: 'default'
                                          }}
                                          onMouseOver={(e) => {
                                              e.currentTarget.style.borderColor = 'rgba(230, 57, 70, 0.2)';
                                              e.currentTarget.style.transform = 'translateY(-10px)';
                                              e.currentTarget.style.background = 'rgba(15, 15, 15, 0.6)';
                                          }}
                                          onMouseOut={(e) => {
                                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.03)';
                                              e.currentTarget.style.transform = 'translateY(0)';
                                              e.currentTarget.style.background = 'rgba(10, 10, 10, 0.4)';
                                          }}
                                      >
                                          {/* Giant Quote Watermark */}
                                          <div style={{
                                              position: 'absolute',
                                              top: '-40px', left: '10px',
                                              fontSize: 'clamp(8rem, 25vw, 15rem)',
                                              fontFamily: "'Outfit', sans-serif",
                                              color: 'rgba(255, 255, 255, 0.02)',
                                              lineHeight: 1,
                                              pointerEvents: 'none',
                                              zIndex: 1
                                          }}>”</div>

                                          <div style={{ position: 'relative', zIndex: 2 }}>
                                              {/* 5 Stars */}
                                              <div style={{ color: 'var(--accent)', fontSize: '1rem', marginBottom: '25px', letterSpacing: '4px' }}>
                                                  ★★★★★
                                              </div>
                                              
                                              <p style={{ fontStyle: 'italic', fontSize: '1.15rem', lineHeight: '1.9', marginBottom: '35px', color: '#bbb', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                                                  "{review.quote}"
                                              </p>
                                              
                                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                                  <div style={{ width: '30px', height: '1px', background: 'var(--accent)', marginRight: '20px' }}></div>
                                                  <h5 style={{ margin: 0, color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '3px', fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>
                                                      {review.name}
                                                  </h5>
                                              </div>
                                          </div>
                                      </motion.div>
                                  </Col>
                              ))}
                              </Row>
                          </div>
                      </div>
                  </div>
            </div>
        </DefaultLayout>
    )
}

export default Home;
