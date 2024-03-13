import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faHome } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const AddLeader = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    phone: "",
    national_id_number: "",
    resident: "",
    position: "",
    ward_leading: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldValidity, setFieldValidity] = useState({
    firstname: false,
    lastname: false,
    gender: false,
    phone: false,
    national_id_number: false,
    resident: false,
    position: false,
    ward_leading: false,


  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const validity = {
      firstname: user.firstname.trim() !== "",
      lastname: user.lastname.trim() !== "",
      gender: user.gender !== "",
      phone: user.phone.trim() !== "",
      national_id_number: user.national_id_number.trim() !== "",
      resident: user.resident.trim() !== "",
      position: user.position.trim() !== "",
      ward_leading: user.ward_leading.trim() !== "",


    };

    setFieldValidity(validity);

    return Object.values(validity).every((value) => value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await axios.post("http://localhost:1010/auth/leader", user);
        setSuccessMessage(`Register successfully! Dear ${user.firstname}`);
        navigate("/addleader");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const renderErrorMessage = (fieldName) => {
    return !fieldValidity[fieldName] && user[fieldName].trim() === "" && (
      <small style={{ color: 'red' }}>Please enter a valid {fieldName.replace(/_/g, ' ').toLowerCase()}</small>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{ backgroundColor: '#282D3C', color: '#fff', paddingTop: '20px' }}>
          <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>e-VMs</div>
          <hr />
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ padding: '10px', textAlign: 'center' }}><a href="/allusers" style={{ color: '#fff', textDecoration: 'none' }}><FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} /> USERS</a></li><hr />
            <li style={{ padding: '10px', textAlign: 'center' }}><a href="/allmembers" style={{ color: '#fff', textDecoration: 'none' }}><FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} /> MEMBERS</a></li><hr />
            <li style={{ padding: '10px', textAlign: 'center' }}><a href="/allwards" style={{ color: '#fff', textDecoration: 'none' }}><FontAwesomeIcon icon={faChartBar} style={{ marginRight: '10px' }} /> WARDS</a></li><hr />
            <li style={{ padding: '10px', textAlign: 'center' }}><a href="/allleader" style={{ color: '#fff', textDecoration: 'none' }}><FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} /> LEADERS</a></li><hr />
            <li style={{ marginTop: '100px', padding: '10px', textAlign: 'center' }}><a href="/admin" style={{ color: '#fff', textDecoration: 'none' }}><FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} /> DASHBOARD</a></li>
          </ul>
        </div>
        <div className="col-md-10" style={{ backgroundColor: '#34568B', padding: '20px', boxShadow: '0 10px 10px rgba(0, 0, 0, 5)' }}>
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>ADMIN DASHBOARD</div>
          <div style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Welcome to e-Village Membership System(e-VMs)</div>

          <div className='container-fluid' style={{ marginTop: '30px' }}>
            <div className="row">
              <div className="col-md-12 ">
                <div className="card border rounded p-20 mt-2 shadow" style={{ height: '500px' }}>
                  <div className="card-header  text-black" style={{ height: '100px' }}>
                    <div style={{ color: 'black', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}> Village Leader Details</div>
                  </div>
                  <div className="card-body">
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {loading ? (
                      <div className="text-center">
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <Form onSubmit={(e) => onSubmit(e)}>
                        <div className="row">
                          <div className="col-md-4">
                            <Form.Group controlId="formFirstName">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="firstname"
                                placeholder="Enter first name"
                                value={user.firstname}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.firstname ? '' : 'red' }}
                              />
                              {renderErrorMessage("firstname")}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group controlId="formLastName">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="lastname"
                                placeholder="Enter last name"
                                value={user.lastname}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.lastname ? '' : 'red' }}
                              />
                              {renderErrorMessage("lastname")}
                            </Form.Group>
                          </div>

                          <div className="col-md-4">
                            <Form.Group controlId="formGender">
                              <Form.Label>Gender</Form.Label>
                              <Form.Control
                                as="select"
                                name="gender"
                                value={user.gender}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.gender ? '' : 'red' }}
                              >
                                <option value="">Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </Form.Control>
                              {renderErrorMessage("gender")}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <Form.Group controlId="formPhone">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control
                                type="number"
                                name="phone"
                                placeholder="Enter phone"
                                value={user.phone}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.street ? '' : 'red' }}
                              />
                              {renderErrorMessage("phone")}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group controlId="formNida">
                              <Form.Label>NIDA</Form.Label>
                              <Form.Control
                                type="number"
                                name="national_id_number"
                                placeholder="Enter Nida Number"
                                value={user.national_id_number}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.national_id_number ? '' : 'red' }}
                              />
                              {renderErrorMessage("national_id_number")}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group controlId="formResident">
                              <Form.Label>Resident</Form.Label>
                              <Form.Control
                                type="text"
                                name="resident"
                                placeholder="Enter resident"
                                value={user.resident}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.resident ? '' : 'red' }}
                              />
                              {renderErrorMessage("resident")}
                            </Form.Group>
                          </div>

                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group controlId="formPosition">
                              <Form.Label>Position</Form.Label>
                              <Form.Control
                                type="text"
                                name="position"
                                placeholder="Enter position"
                                value={user.position}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.position ? '' : 'red' }}
                              />
                              {renderErrorMessage("position")}
                            </Form.Group>
                          </div>

                          <div className="col-md-6">
                            <Form.Group controlId="formWardReading">
                              <Form.Label>Ward_Leading</Form.Label>
                              <Form.Control
                                type="text"
                                name="ward_leading"
                                placeholder="Enter ward_leading"
                                value={user.ward_leading}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.ward_leading ? '' : 'red' }}
                              />
                              {renderErrorMessage("ward_leading")}
                            </Form.Group>
                          </div>

                        </div>
                        {/* Additional form fields can be added here */}
                        <button
                          type='submit'
                          className='btn btn-secondary  d-block mx-auto'
                          style={{ width: '150px', height: '50px', backgroundColor: '', marginTop: '30px' }}
                        >
                          SUBMIT
                        </button>
                      </Form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeader;
