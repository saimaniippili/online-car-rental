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

                  {/* LIGHT MODE: Fleet Section */}
                  <div id="fleet" className="content-container theme-light" style={{ background: '#f9f9f9', paddingBottom: '80px', paddingTop: '80px', position: 'relative' }}>
                      <div style={{ paddingBottom: '40px', position: 'relative', zIndex: 3, maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', letterSpacing: '2px', color: '#666', textTransform: 'uppercase', marginBottom: '10px' }}>OUR FLEET</p>
                          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 500, color: '#111', margin: '0 0 40px 0' }}>Choose Your Dream Drive</h2>
                          
                          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px', alignItems: 'center' }}>
                             {['All Cars', 'SUV', 'Sedan', 'Coupe', 'Convertible', 'Supercar'].map((cat, idx) => (
                                 <button key={idx} style={{
                                     padding: '10px 25px',
                                     borderRadius: '30px',
                                     border: 'none',
                                     background: idx === 0 ? '#111' : '#f0f0f0',
                                     color: idx === 0 ? '#fff' : '#111',
                                     fontFamily: "'Inter', sans-serif",
                                     fontSize: '0.85rem',
                                     fontWeight: 500,
                                     cursor: 'pointer',
                                     transition: 'all 0.3s ease'
                                 }}>
                                     {cat}
                                 </button>
                             ))}
                             <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                 <span style={{ fontSize: '0.9rem', color: '#111', fontWeight: 500 }}>View All</span>
                                 <div style={{ display: 'flex', gap: '10px' }}>
                                     <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                                     <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
                                 </div>
                             </div>
                          </div>
                      </div>

                      {loading == true && (<Spinner/>)}

                      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
                          <Row justify='center' gutter={[24, 24]}>
                               {totalCars.map((car, index)=>{
                                   return <Col lg={6} md={12} sm={12} xs={24} key={car._id}>
                                       <LuxuryCard car={car} handleReserve={handleReserve} index={index} />
                                   </Col>
                               })}
                          </Row>
                      </div>
                  </div>

                  {/* LIGHT MODE: Luxury Details / Why Choose Us */}
                  <div className="section-padding theme-light" style={{ backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px', position: 'relative' }}>
                      <Row gutter={[60, 60]} justify="center" style={{ maxWidth: '1400px', margin: '0 auto', alignItems: 'center' }}>
                          <Col xs={24} lg={12}>
                              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 4vw, 4rem)', fontWeight: 500, color: '#111', lineHeight: '1.1', marginBottom: '30px' }}>
                                      Luxury Is <br/>In The Details
                                  </h2>
                                  <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '40px', maxWidth: '400px', lineHeight: '1.8' }}>
                                      We deliver more than just cars. We deliver experiences.
                                  </p>
                                  <button style={{ background: '#111', color: '#fff', padding: '15px 40px', border: 'none', borderRadius: '2px', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 600, cursor: 'pointer' }}>
                                      ABOUT US
                                  </button>
                              </motion.div>
                          </Col>
                          
                          <Col xs={24} lg={12}>
                              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                  {[
                                      { title: "Premium Quality", desc: "Handpicked luxury vehicles", icon: "💎" },
                                      { title: "Best Price Guarantee", desc: "Competitive pricing always", icon: "🛡️" },
                                      { title: "24/7 Customer Support", desc: "We're here for you anytime", icon: "🎧" },
                                      { title: "Flexible Booking", desc: "Change or cancel with ease", icon: "📅" }
                                  ].map((item, idx) => (
                                      <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                              {item.icon}
                                          </div>
                                          <div>
                                              <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: '#111', margin: '0 0 5px 0', fontWeight: 600 }}>{item.title}</h4>
                                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#777', margin: 0 }}>{item.desc}</p>
                                          </div>
                                      </div>
                                  ))}
                              </motion.div>
                          </Col>
                      </Row>
                  </div>

                  {/* DARK MODE: How It Works */}
                  <div className="section-padding" style={{ backgroundColor: '#050505', paddingTop: '100px', paddingBottom: '100px' }}>
                      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', letterSpacing: '2px', color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>HOW IT WORKS</p>
                          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 3.5vw, 3.5rem)', fontWeight: 500, color: '#fff', margin: '0 0 80px 0', lineHeight: 1.1 }}>
                              Your Journey, <br/>Simplified
                          </h2>

                          <Row gutter={[40, 40]}>
                              {[
                                  { num: "01", title: "Choose Your Car", desc: "Browse our premium collection." },
                                  { num: "02", title: "Pick Your Dates", desc: "Select your perfect booking details." },
                                  { num: "03", title: "Confirm Booking", desc: "Secure your booking in minutes." },
                                  { num: "04", title: "Enjoy The Drive", desc: "Experience luxury like never before." }
                              ].map((step, idx) => (
                                  <Col xs={24} sm={12} lg={6} key={idx}>
                                      <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px' }}>
                                          <div style={{ fontSize: '1.2rem', color: 'var(--accent)', fontFamily: "'Outfit', sans-serif", fontWeight: 600, marginBottom: '20px' }}>{step.num}</div>
                                          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: '#fff', margin: '0 0 10px 0', fontWeight: 500 }}>{step.title}</h4>
                                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#888', margin: 0 }}>{step.desc}</p>
                                      </div>
                                  </Col>
                              ))}
                          </Row>
                          
                          <button style={{ marginTop: '60px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '15px 35px', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 600, cursor: 'pointer' }}>
                              BOOK YOUR CAR
                          </button>
                      </div>
                  </div>

                  {/* DARK MODE: Testimonials */}
                  <div id="reviews" className="section-padding" style={{ backgroundColor: '#020202', borderTop: '1px solid rgba(255,255,255,0.05)', paddingBottom: '100px' }}>
                      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', letterSpacing: '2px', color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>TESTIMONIALS</p>
                          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 3.5vw, 3.5rem)', fontWeight: 500, color: '#fff', margin: '0 0 60px 0', lineHeight: 1.1 }}>
                              What Our Clients Say
                          </h2>
                          
                          <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', padding: '40px', borderRadius: '12px', maxWidth: '600px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                                  <img src="https://i.pravatar.cc/150?img=68" alt="Client" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                  <div>
                                      <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Michael R.</h4>
                                      <div style={{ color: 'var(--accent)', fontSize: '0.9rem', letterSpacing: '2px' }}>★★★★★</div>
                                  </div>
                              </div>
                              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#ccc', fontStyle: 'italic', lineHeight: '1.8', margin: 0 }}>
                                  "The car was immaculate and the service was exceptional. Best rental experience I've ever had!"
                              </p>
                          </div>
                      </div>
                  </div>

            </div>
        </DefaultLayout>
    )
}

export default Home;
