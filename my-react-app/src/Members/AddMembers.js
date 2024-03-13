import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faHome } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const AddMembers = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
    gender: "",
    street: "",
    postal_code: "",
    ward: "",
    occupation: "",
    phone: "",
    village_relation: "",
    disorder: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldValidity, setFieldValidity] = useState({
    firstname: false,
    lastname: false,
    date_of_birth: false,
    gender: false,
    street: false,
    postal_code: false,
    ward: false,
    occupation: false,
    phone: false,
    village_relation: false,
    disorder: false,
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const validity = {
      firstname: user.firstname.trim() !== "",
      lastname: user.lastname.trim() !== "",
      date_of_birth: user.date_of_birth !== "",
      gender: user.gender !== "",
      street: user.street.trim() !== "",
      postal_code: user.postal_code.trim() !== "",
      ward: user.ward.trim() !== "",
      occupation: user.occupation.trim() !== "",
      phone: user.phone.trim() !== "",
      village_relation: user.village_relation.trim() !== "",
      disorder: user.disorder.trim() !== "",
    };

    setFieldValidity(validity);

    return Object.values(validity).every((value) => value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await axios.post("http://localhost:1010/auth/member", user);
        setSuccessMessage(`Register successfully! Dear ${user.firstname}`);
        navigate("/addmembers");
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
                    <div style={{ color: 'black', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}> Village Members Details</div>
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
                          <div className="col-md-3">
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
                          <div className="col-md-3">
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
                          <div className="col-md-3">
                            <Form.Group controlId="formDateOfBirth">
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control
                                type="date"
                                name="date_of_birth"
                                placeholder="Enter date of birth"
                                value={user.date_of_birth}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.date_of_birth ? '' : 'red' }}
                              />
                              {renderErrorMessage("date_of_birth")}
                            </Form.Group>
                          </div>
                          <div className="col-md-3">
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
                          <div className="col-md-3">
                            <Form.Group controlId="formStreet">
                              <Form.Label>Street</Form.Label>
                              <Form.Control
                                type="text"
                                name="street"
                                placeholder="Enter street"
                                value={user.street}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.street ? '' : 'red' }}
                              />
                              {renderErrorMessage("street")}
                            </Form.Group>
                          </div>
                          <div className="col-md-3">
                            <Form.Group controlId="formPostalCode">
                              <Form.Label>Postal Code</Form.Label>
                              <Form.Control
                                type="text"
                                name="postal_code"
                                placeholder="Enter postal code"
                                value={user.postal_code}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.postal_code ? '' : 'red' }}
                              />
                              {renderErrorMessage("postal_code")}
                            </Form.Group>
                          </div>
                          <div className="col-md-3">
                            <Form.Group controlId="formWard">
                              <Form.Label>Ward</Form.Label>
                              <Form.Control
                                type="text"
                                name="ward"
                                placeholder="Enter ward"
                                value={user.ward}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.ward ? '' : 'red' }}
                              />
                              {renderErrorMessage("ward")}
                            </Form.Group>
                          </div>
                          <div className="col-md-3">
                            <Form.Group controlId="formOccupation">
                              <Form.Label>Occupation</Form.Label>
                              <Form.Control
                                type="text"
                                name="occupation"
                                placeholder="Enter occupation"
                                value={user.occupation}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.occupation ? '' : 'red' }}
                              />
                              {renderErrorMessage("occupation")}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <Form.Group controlId="formPhone">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Enter phone"
                                value={user.phone}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.phone ? '' : 'red' }}
                              />
                              {renderErrorMessage("phone")}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group controlId="formVillageRelation">
                              <Form.Label>Village Relation</Form.Label>
                              <Form.Control
                                type="text"
                                name="village_relation"
                                placeholder="Enter village relation"
                                value={user.village_relation}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.village_relation ? '' : 'red' }}
                              />
                              {renderErrorMessage("village_relation")}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group controlId="formADisorder">
                              <Form.Label>Disorder</Form.Label>
                              <Form.Control
                                type="text"
                                name="disorder"
                                placeholder="Enter any disorder"
                                value={user.disorder}
                                onChange={onInputChange}
                                style={{ height: '50px', borderColor: fieldValidity.disorder ? '' : 'red' }}
                              />
                              {renderErrorMessage("disorder")}
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

export default AddMembers;
