import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartPie, faUsers, faCog, faUserTie, faDollarSign, faChartBar } from '@fortawesome/free-solid-svg-icons';

const User = () => {
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
        }, 3000);
    };

    return (
        <div style={containerStyle}>
            {/* Sidebar */}
            <div style={sidebarStyle}>
                <div style={headerStyle}>e-VMs</div><hr />
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li style={listItemStyle}><a href="#" style={linkStyle}><FontAwesomeIcon icon={faChartLine} style={{ marginRight: '10px' }} /> Dashboard</a></li><hr />
                    <li style={listItemStyle}><a href="#" style={linkStyle}><FontAwesomeIcon icon={faChartPie} style={{ marginRight: '10px' }} /> Analytics</a></li><hr />
                    <li style={listItemStyle}><a href="#" style={linkStyle}><FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} /> Users</a></li><hr />
                    <li style={listItemStyle}><a href="#" style={linkStyle}><FontAwesomeIcon icon={faCog} style={{ marginRight: '10px' }} /> Settings</a></li><hr />
                </ul>
            </div>

            {/* Page content */}
            <div style={contentStyle}>
                {logoutMessage && <div>{logoutMessage}</div>} {/* Display logout message */}
                <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div style={headerStyle}>USER DASHBOARD</div>
                <div style={paraStyle}>Welcome to e-Village Membership System(e-VMs)</div>
                {/* Counting Cards */}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '80px' }}>
                    <div style={{ boxShadow: '0 5px 10px rgba(255, 0, 0, 0.3)', padding: '70px', borderRadius: '10px', backgroundColor: ' #34568B' }}>
                        <div style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} />
                            Customers
                        </div>
                        <div style={paraStyle}>100</div>
                    </div>
                    <div style={{ boxShadow: '0 5px 10px rgba(0, 255, 0, 0.3)', padding: '70px', borderRadius: '10px', backgroundColor: '#88B04B' }}>
                        <div style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faUserTie} style={{ marginRight: '10px' }} />
                            Managers
                        </div>
                        <div style={paraStyle}>20</div>
                    </div>
                    <div style={{ boxShadow: '0 5px 10px rgba(0, 0, 255,0.3)', padding: '70px', borderRadius: '10px', backgroundColor: ' #D65076' }}>
                        <div style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '10px' }} />
                            Total Sales
                        </div>
                        <div style={paraStyle}>$50,000</div>
                    </div>
                    <div style={{ boxShadow: '0 5px 10px rgba(255, 255, 0, 0.3)', padding: '70px', borderRadius: '10px', backgroundColor: '#006B54' }}>
                        <div style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faChartBar} style={{ marginRight: '10px' }} />
                            Total Wepo
                        </div>
                        <div style={paraStyle}>$10,000</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
