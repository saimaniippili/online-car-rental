import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from 'aos';
import { useParams } from "react-router-dom";
import 'aos/dist/aos.css'; 
const { RangePicker } = DatePicker;

function BookingCar(props) {
  const params = useParams();
  const carid = props.match?.params?.carid || params.carid;
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == carid) || {});
    }
  }, [cars, carid]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  

  function handleBooking() {
    const reqObj = {
        user: JSON.parse(localStorage.getItem("user"))._id,
        car: car._id,
        totalHours,
        totalAmount,
        driverRequired: driver,
        bookedTimeSlots: {
          from,
          to,
        },
      };
  
      dispatch(bookCar(reqObj));
  }

  if (!car || !car.name) {
    return (
        <DefaultLayout>
            <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Spinner />
                <div style={{ marginTop: '50px', color: '#fff', fontFamily: 'monospace', background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '4px' }}>
                    <p style={{ color: 'var(--accent)', fontWeight: 'bold' }}>SYSTEM DIAGNOSTICS:</p>
                    <p>Detected Car ID: {carid || 'NULL'}</p>
                    <p>Total Cars in Database: {cars.length}</p>
                    <p>Selected Car Name: {car.name || 'NULL'}</p>
                    {cars.length > 0 && <p>Sample Car ID from DB: {cars[0]._id}</p>}
                </div>
            </div>
        </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div style={{ background: '#050505', minHeight: '100vh', paddingTop: '100px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '500px', background: 'radial-gradient(ellipse at top right, rgba(230, 57, 70, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        <Row
          justify="center"
          className="d-flex align-items-center"
          style={{ minHeight: "80vh", maxWidth: '1400px', margin: '0 auto' }}
        >
          <Col lg={12} sm={24} xs={24} className='p-5' style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '20px', background: 'rgba(0,0,0,0.5)', filter: 'blur(20px)', borderRadius: '50%' }}></div>
            <img src={car.image} className="w-100" style={{ objectFit: 'contain', position: 'relative', zIndex: 2, transform: 'scale(1.1)' }} data-aos='fade-right' data-aos-duration='1500' alt={car.name} />
          </Col>

          <Col lg={10} sm={24} xs={24} className="text-left p-5" data-aos='fade-left' data-aos-duration='1500' style={{ background: 'transparent' }}>
            <p className="car-category" style={{ fontSize: '0.9rem', letterSpacing: '4px', color: 'var(--accent)', margin: '0 0 10px 0' }}>PREMIUM {car.fuelType}</p>
            <h2 className="car-title" style={{ fontSize: '3.5rem', margin: '0 0 10px 0', letterSpacing: '2px' }}>{car.name}</h2>
            <p className="car-price" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '30px' }}>₹ {car.rentPerHour} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ hour</span></p>
            
            <div className="d-flex" style={{ gap: '40px', marginBottom: '40px' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Capacity</p>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{car.capacity} Persons</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Drive</p>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>AWD / RWD</p>
              </div>
            </div>

            <div style={{ width: '100%', height: '1px', background: 'var(--glass-border)', marginBottom: '40px' }}></div>

            <h3 className="car-title mb-4" style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>RESERVATION WINDOW</h3>
            <RangePicker
              className="glass-picker w-100 mb-4"
              showTime={{ format: "HH:mm" }}
              format="MMM DD yyyy HH:mm"
              onChange={selectTimeSlots}
              style={{ padding: '15px 20px', fontSize: '1.1rem' }}
            />
            
            <button
              className="premium-btn btn-outline mb-5"
              style={{ padding: '10px 20px', fontSize: '0.8rem', letterSpacing: '2px' }}
              onClick={() => {
                setShowModal(true);
              }}
            >
              VIEW UNAVAILABLE SLOTS
            </button>

            {from && to && (
              <div className="p-4" style={{ border: '1px solid var(--accent)', background: 'rgba(230, 57, 70, 0.05)', borderRadius: '4px' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: 'var(--text-secondary)' }}>Duration:</span>
                  <span style={{ fontWeight: 'bold' }}>{totalHours} Hours</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ color: 'var(--text-secondary)' }}>Rate:</span>
                  <span style={{ fontWeight: 'bold' }}>₹ {car.rentPerHour} / hr</span>
                </div>
                
                <Checkbox
                  className="mb-4 w-100"
                  style={{ color: 'white', padding: '15px', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setdriver(true);
                    } else {
                      setdriver(false);
                    }
                  }}
                >
                  Add Chauffeur Service (+₹30/hr)
                </Checkbox>

                <div className="d-flex justify-content-between align-items-end mb-4">
                  <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Amount</span>
                  <h2 className="car-price m-0" style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>₹ {totalAmount}</h2>
                </div>

                <button 
                  className="premium-btn w-100" 
                  style={{ padding: '18px', fontSize: '1.1rem', letterSpacing: '2px' }}
                  onClick={() => handleBooking()}
                >
                  BOOK NOW
                </button>
              </div>
            )}
          </Col>
        </Row>
      </div>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title={<span style={{ color: 'black' }}>Booked time slots</span>}
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot, idx) => {
                return (
                  <button key={idx} className="btn1 mt-2 mr-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
    </DefaultLayout>
  );
}

export default BookingCar;