import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faHome, faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Form component from react-bootstrap

const AllMembers = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false); // Added showModal state
    const { id } = useParams();

    useEffect(() => {
        LoadUsers();
    }, []);

    const LoadUsers = async () => {
        const result = await axios.get("http://localhost:1010/auth/member");
        setUsers(result.data);
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [logoutMessage, setLogoutMessage] = useState("");

    const handleDelete = async () => {
        await axios.delete(`http://localhost:1010/auth/member/${deleteUserId}`);
        LoadUsers();
        setShowDeleteModal(false);
    };

    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        height: '100vh',
    };

    const sidebarStyle = {
        width: '250px',
        backgroundColor: '#282D3C',
        color: '#fff',
        padding: '20px',
    };

    const contentStyle = {
        flex: '1',
        padding: '20px',
        backgroundColor: '#34568B',
        height: '150px',
        boxShadow: '0 10px 10px rgba(0, 0, 0, 5)',
    };

    const listItemStyle = {
        padding: '10px',
        textAlign: 'center',
    };

    const headerStyle = {
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    };

    const paraStyle = {
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
    };

    const handleLogout = () => {
        setLogoutMessage("You have successfully logged out.");
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <div style={containerStyle}>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <div style={sidebarStyle}>
                <div style={headerStyle}>e-VMs</div><hr />
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li style={listItemStyle}><a href="/allusers" style={linkStyle}><FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} /> USERS</a></li><hr />
                    <li style={listItemStyle}><a href="/allmembers" style={linkStyle}><FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} /> MEMBERS</a></li><hr />
                    <li style={listItemStyle}><a href="/allwards" style={linkStyle}><FontAwesomeIcon icon={faChartBar} style={{ marginRight: '10px' }} /> WARDS</a></li><hr />
                    <li style={listItemStyle}><a href="/allleader" style={linkStyle}><FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} /> LEADERS</a></li><hr />
                    <li style={{ marginTop: '100px' }}><a href="/admin" style={linkStyle}><FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} /> DASHBOARD</a></li>
                </ul>
            </div>
            <div style={contentStyle}>
                <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div style={headerStyle}>ADMIN DASHBOARD</div>
                <div style={paraStyle}>Welcome to e-Village Membership System(e-VMs)</div>
                <a href="/addmembers"> <button type="button" className="btn btn-success mx-2" style={{ padding: '12px', marginTop: '40px', width: '150px' }}>NEW-MEMBER</button></a>
                <div style={{ color: 'black', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}> Village Members Details</div>                <div className='container-fluid'>


                    <div className='py-0'>
                        <table className="table border shadow" style={{ marginTop: '10px', width: '1300px' }}>

                            <thead >
                                <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">FirstName</th>
                                    <th scope="col">LastName</th>
                                    <th scope="col">D.O.B</th>
                                    <th scope="col">Gender</th>


                                    <th scope="col">Ward</th>
                                    <th scope="col">Occupation</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">VillageRelation</th>

                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.date_of_birth}</td>
                                        <td>{user.gender}</td>


                                        <td>{user.ward}</td>
                                        <td>{user.occupation}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.village_relation}</td>

                                        <td>
                                            <Link to={`/viewmembers/${user.id}`}
                                                className="btn btn-primary mx-1" style={{ padding: '6px' }}><FontAwesomeIcon icon={faEye} /></Link>
                                            <Link to={`/editmembers/${user.id}`}
                                                className="btn btn-success mx-1" style={{ padding: '6px' }}><FontAwesomeIcon icon={faPen} /></Link>
                                            <button type="button" className="btn btn-danger mx-1" onClick={() => { setDeleteUserId(user.id); setShowDeleteModal(true); }} style={{ padding: '6px' }}><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllMembers;
