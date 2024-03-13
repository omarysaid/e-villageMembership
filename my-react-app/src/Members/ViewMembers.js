import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faHome } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const ViewMembers = () => {
  let navigate = useNavigate();
  const { id } = useParams();

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





  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`http://localhost:1010/auth/member/${id}`);
        setUser(result.data);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUser();
  }, [id]);

  const handleValidation = (fieldName, isValid) => {
    setFieldValidity(prevState => ({
      ...prevState,
      [fieldName]: isValid,
    }));
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
                    <div style={{ color: 'black', fontSize: '25px', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>({user.firstname} {user.lastname})_Membership_Details</div>

                  </div>
                  <div className="card" style={{ textAlign: 'center', padding: '10px' }}>
                    <ul>

                      <li className='list-group list-group-item'>
                        <b>D.O.B: </b>  <b style={{ marginLeft: "200px", padding: '100' }}>{user.date_of_birth}</b>
                      </li>
                      <li className='list-group list-group-item'>
                        <b>GENDER: </b> <b style={{ marginLeft: "200px", padding: '100' }}>{user.gender}</b>
                      </li>
                      <li className='list-group list-group-item'>
                        <b>STREET: </b> <b style={{ marginLeft: "200px", padding: '10' }}>{user.street}</b>
                      </li>
                      <li className='list-group list-group-item'>
                        <b>POSTAL CODE: </b> <b style={{ marginLeft: "200px", padding: '10' }}>{user.postal_code}</b>
                      </li>
                      <li className='list-group list-group-item'>
                        <b>WARD: </b> <b style={{ marginLeft: "200px" }}> {user.ward}</b>
                      </li>
                      <li className='list-group list-group-item'>
                        <b>UCCUPATION: </b> <b style={{ marginLeft: "200px" }}>{user.occupation}</b>
                      </li>
                      <li className='list-group list-group-item'>
                        <b>PHONE: </b>  <b style={{ marginLeft: "200px" }}>{user.phone}</b>
                      </li>
                      <li className='list-group list-group-item'>
                        <b>VILLAGE-RELATION: </b >  <b style={{ marginLeft: "200px" }}>{user.village_relation}</b>
                      </li>
                      <li className='list-group list-group-item'>
                        <b>DISORDER: </b>  <b style={{ marginLeft: "200px" }} >{user.disorder}</b>
                      </li>

                    </ul>


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

export default ViewMembers;
