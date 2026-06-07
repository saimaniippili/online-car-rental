/* eslint-disable */

import { Col, Row, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addCar, editCar, getAllCars } from "../redux/actions/carsActions";
function EditCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState();
  const [totalcars, settotalcars] = useState([]);
  const [uploadMethod, setUploadMethod] = useState('url');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      settotalcars(cars);
      setcar(cars.find((o) => o._id == match.params.carid));
      console.log(car);
    }
  }, [cars]);

  async function onFinish(values) {
    values._id = car._id;

    if (uploadMethod === 'file' && file) {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                values.image = 'http://localhost:5000' + data.url;
            } else {
                alert("Image upload failed");
                return;
            }
        } catch (err) {
            console.error(err);
            alert("Image upload error");
            return;
        }
    }

    dispatch(editCar(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div style={{ background: '#050505', minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px' }}>
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {totalcars.length > 0 && (
            <Form
              initialValues={car}
              className="luxury-card p-4"
              layout="vertical"
              onFinish={onFinish}
              style={{ background: 'rgba(15, 15, 15, 0.7)', border: '1px solid #333' }}
            >
              <h1 style={{ color: 'white', fontWeight: 300, letterSpacing: '2px', textAlign: 'center', marginBottom: '30px' }}>EDIT VEHICLE</h1>

              <hr style={{ borderColor: '#333', marginBottom: '30px' }} />
              <Form.Item
                name="name"
                label={<span style={{ color: '#ccc' }}>Vehicle Name</span>}
                rules={[{ required: true }]}
              >
                <Input style={{ background: '#111', border: '1px solid #333', color: 'white', padding: '10px' }} />
              </Form.Item>

              <div style={{ marginBottom: '20px' }}>
                  <Radio.Group onChange={(e) => setUploadMethod(e.target.value)} value={uploadMethod} style={{ marginBottom: '10px' }}>
                      <Radio value="url" style={{ color: '#ccc' }}>Paste Image URL</Radio>
                      <Radio value="file" style={{ color: '#ccc' }}>Upload Image File</Radio>
                  </Radio.Group>
                  
                  {uploadMethod === 'url' ? (
                      <Form.Item name='image' label={<span style={{ color: '#ccc' }}>Image URL</span>} rules={[{required: uploadMethod === 'url'}]}>
                          <Input style={{ background: '#111', border: '1px solid #333', color: 'white', padding: '10px' }} />
                      </Form.Item>
                  ) : (
                      <div style={{ marginBottom: '24px' }}>
                          <div style={{ color: '#ccc', marginBottom: '8px' }}>Upload Image File</div>
                          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} style={{ color: 'white', background: '#111', padding: '10px', border: '1px solid #333', width: '100%', borderRadius: '2px' }} />
                      </div>
                  )}
              </div>

              <Form.Item
                name="rentPerHour"
                label={<span style={{ color: '#ccc' }}>Rent Per Hour (₹)</span>}
                rules={[{ required: true }]}
              >
                <Input type="number" style={{ background: '#111', border: '1px solid #333', color: 'white', padding: '10px' }} />
              </Form.Item>
              <Form.Item
                name="capacity"
                label={<span style={{ color: '#ccc' }}>Seating Capacity</span>}
                rules={[{ required: true }]}
              >
                <Input type="number" style={{ background: '#111', border: '1px solid #333', color: 'white', padding: '10px' }} />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label={<span style={{ color: '#ccc' }}>Drivetrain / Fuel Type</span>}
                rules={[{ required: true }]}
              >
                <Input style={{ background: '#111', border: '1px solid #333', color: 'white', padding: '10px' }} />
              </Form.Item>

              <div className="text-right mt-5">
                <button className="premium-btn" style={{ width: '100%', padding: '15px' }}>SAVE CHANGES</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
      </div>
    </DefaultLayout>
  );
}

export default EditCar;
