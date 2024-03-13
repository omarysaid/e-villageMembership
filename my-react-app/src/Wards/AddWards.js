import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faHome } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const AddLeader = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    ward_name: "",
    population: "",
    school: "",
    health_care: "",
    houses: "",
    people_alive: "",
    people_died: "",

  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldValidity, setFieldValidity] = useState({
    ward_name: false,
    population: false,
    school: false,
    health_care: false,
    houses: false,
    people_alive: false,
    people_died: false,



  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const validity = {
      ward_name: user.ward_name.trim() !== "",
      population: user.population.trim() !== "",
      school: user.school !== "",
      health_care: user.health_care.trim() !== "",
      houses: user.houses.trim() !== "",
      people_alive: user.people_alive.trim() !== "",
      people_died: user.people_died.trim() !== "",



    };

    setFieldValidity(validity);

    return Object.values(validity).every((value) => value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await axios.post("http://localhost:1010/auth/ward", user);
        setSuccessMessage(`Register successfully!  ${user.ward_name}`);
        navigate("/addwards");
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
                            <Form.Group controlId="formWardName">
                              <Form.Label>ward_name</Form.Label>
                              <Form.Control
                                type="text"
                                name="ward_name"
                                placeholder="Enter first ward_name"
                                value={user.ward_name}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.ward_name ? '' : 'red' }}
                              />
                              {renderErrorMessage("ward_name")}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group controlId="population">
                              <Form.Label>Population</Form.Label>
                              <Form.Control
                                type="number"
                                name="population"
                                placeholder="Enter population"
                                value={user.population}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.population ? '' : 'red' }}
                              />
                              {renderErrorMessage("population")}
                            </Form.Group>
                          </div>

                          <div className="col-md-4">
                            <Form.Group controlId="formSchool">
                              <Form.Label>School</Form.Label>
                              <Form.Control
                                type="number"
                                name="school"
                                placeholder="Enter school"
                                value={user.school}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.school ? '' : 'red' }}
                              />
                              {renderErrorMessage("school")}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <Form.Group controlId="formHealthCare">
                              <Form.Label>Health_Care</Form.Label>
                              <Form.Control
                                type="number"
                                name="health_care"
                                placeholder="Enter health_care"
                                value={user.health_care}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.health_care ? '' : 'red' }}
                              />
                              {renderErrorMessage("health_care")}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group controlId="formNida">
                              <Form.Label>Houses</Form.Label>
                              <Form.Control
                                type="number"
                                name="houses"
                                placeholder="Enter houses"
                                value={user.houses}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.houses ? '' : 'red' }}
                              />
                              {renderErrorMessage("houses")}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group controlId="formPeopleAlive">
                              <Form.Label>People_Alive</Form.Label>
                              <Form.Control
                                type="number"
                                name="people_alive"
                                placeholder="Enter people_alive"
                                value={user.people_alive}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.people_alive ? '' : 'red' }}
                              />
                              {renderErrorMessage("people_alive")}
                            </Form.Group>
                          </div>

                        </div>
                        <div className="row">
                          <div className="col-md-3">
                          </div>

                          <div className="col-md-6">
                            <Form.Group controlId="formPeopleDied">
                              <Form.Label>People_Died</Form.Label>
                              <Form.Control
                                type="number"
                                name="people_died"
                                placeholder="Enter people_died"
                                value={user.people_died}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.people_died ? '' : 'red' }}
                              />
                              {renderErrorMessage("people_died")}
                            </Form.Group>
                          </div>



                          <div className="col-md-3">
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
