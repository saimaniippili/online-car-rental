import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
const { RangePicker } = DatePicker;
function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  return (
    <DefaultLayout>
      <div style={{ background: '#050505', minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px' }}>
        <Row justify="center" gutter={16}>
          <Col lg={20} sm={24}>
            <div className="d-flex justify-content-between align-items-center mb-5" style={{ padding: '0 20px' }}>
              <h1 style={{ color: 'white', fontWeight: 300, letterSpacing: '2px', margin: 0 }}>ADMINISTRATION</h1>
              <Link to="/addcar">
                <button className="premium-outline-btn" style={{ padding: '10px 25px', color: 'white', border: '1px solid white', background: 'transparent', cursor: 'pointer', letterSpacing: '1px' }}>
                  + ADD NEW VEHICLE
                </button>
              </Link>
            </div>
          </Col>
        </Row>

      {loading == true && <Spinner />}

      <Row justify="center" gutter={[32, 32]}>
        {totalCars.map((car) => {
          return (
            <Col lg={7} sm={24} xs={24} key={car._id}>
              <div className="luxury-card" style={{ padding: '0', background: 'rgba(15, 15, 15, 0.7)', border: '1px solid #333' }}>
                <div style={{ width: '100%', height: '250px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={car.image} style={{ width: '90%', objectFit: 'contain' }} alt={car.name} />
                </div>

                <div className="p-3 d-flex align-items-center justify-content-between" style={{ borderTop: '1px solid #222' }}>
                  <div className="text-left">
                    <p style={{ color: 'white', fontSize: '1.2rem', margin: 0, fontWeight: 500 }}>{car.name}</p>
                    <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>₹{car.rentPerHour} / hr</p>
                  </div>

                  <div className="d-flex align-items-center">
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>

                    <Popconfirm
                      title="Delete this vehicle?"
                      onConfirm={()=>{dispatch(deleteCar({carid : car._id}))}}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "#E63946", cursor: "pointer", fontSize: '1.2rem' }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      </div>
    </DefaultLayout>
  );
}

export default AdminHome;