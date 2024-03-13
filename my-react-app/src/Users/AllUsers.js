
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar, faHome } from '@fortawesome/free-solid-svg-icons';

const AllUsers = () => {
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
        boxShadow: '0 10px 10px rgba(0, 0, 0, 5)', // Default shadow color
    };

    const listItemStyle = {
        padding: '10px',
        textAlign: 'center',
    };

    const headerStyle = {
        color: 'white',
        fontSize: '24px', // Example font size
        fontWeight: 'bold', // Example font weight
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif', // Example font family
        // Add any other font properties you want to apply
    };

    const paraStyle = {
        color: 'white',
        fontSize: '14px', // Example font size
        fontWeight: 'bold', // Example font weight
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif', // Example font family
        // Add any other font properties you want to apply
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
    };

    const [logoutMessage, setLogoutMessage] = useState(""); // State to track logout message

    const handleLogout = () => {
        // Perform logout action here (e.g., clear session, local storage)
        // Set the logout message
        setLogoutMessage("You have successfully logged out.");

        // Wait for 3 seconds before redirecting
        setTimeout(() => {
            // Redirect to the home page after 3 seconds
            navigate('/');
        }, 1000);
    };

    return (
        <div style={containerStyle}>
            {/* Sidebar */}
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

            {/* Page content */}
            <div style={contentStyle}>
                {logoutMessage && <div>{logoutMessage}</div>} {/* Display logout message */}
                <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div style={headerStyle}>ADMIN DASHBOARD</div>
                <div style={paraStyle}>Welcome to e-Village Membership System(e-VMs)</div>

            </div>
        </div>
    );
};

export default AllUsers;
