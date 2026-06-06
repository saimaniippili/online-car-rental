import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row } from "antd";
import Spinner from '../components/Spinner';
import moment from "moment";
function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const {loading} = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <DefaultLayout>
      <div style={{ background: '#050505', minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px' }}>
        {loading && (<Spinner />)}
      <h1 className="text-center mt-4 mb-4 hero-title" style={{ fontSize: '3rem' }}>My Bookings</h1>
    
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
         
             {bookings.filter(o=>o.user==user._id).map((booking, idx) => {
              // Sequelize populates the model under the capitalized Model name 'Car', whereas the foreign key is lowercase 'car'
              const carObj = booking.Car || (typeof booking.car === 'object' ? booking.car : {});

              return (
                <Row key={idx} gutter={16} className="luxury-card mt-4 text-left p-4 d-flex align-items-center" style={{ border: '1px solid #333' }}>
                  <Col lg={6} sm={24}>
                      <p style={{ fontSize: '1.2rem', color: 'var(--accent)' }}><b>{carObj.name}</b></p>
                      <p>Total hours : <b>{booking.totalHours}</b></p>
                      <p>Rent per hour : <b>₹ {carObj.rentPerHour}</b></p>
                      <p style={{ fontSize: '1.3rem', marginTop: '10px' }}>Total : <b>₹ {booking.totalAmount}</b></p>
                  </Col>

                  <Col lg={12} sm={24}>
                  <p>Transaction Id : <b>{booking.transactionId}</b></p>
                  <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                  <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                  <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                  </Col>

                  <Col lg={6} sm={24} className='text-right'>
                      <img style={{borderRadius: 10, width: '100%', objectFit: 'cover'}} src={carObj.image} height="140" alt="car"/>
                  </Col>
                </Row>
              );
            })}
          
        </Col>
      </Row>
      </div>
    </DefaultLayout>
  );
}

export default UserBookings;