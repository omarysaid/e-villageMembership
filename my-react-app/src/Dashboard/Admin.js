import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
    const navigate = useNavigate();
    const [totalMembers, setTotalMembers] = useState(0); //member
    const [totalWards, setTotalWards] = useState(0);//ward
    const [totalLeaders, setTotalLeaders] = useState(0); //leader

    useEffect(() => {
        // Fetch total members from your database
        fetchTotalMembers();
        fetchTotalWards();
        fetchTotalLeaders();
    }, []);

    const fetchTotalMembers = async () => {
        try {
            const response = await fetch('http://localhost:1010/auth/member/count');
            const data = await response.json();
            setTotalMembers(data); // Update totalMembers state with fetched count
        } catch (error) {
            console.error('Error fetching total members:', error);
        }
    };

    const fetchTotalWards = async () => {
        try {
            const response = await fetch('http://localhost:1010/auth/ward/count');
            const data = await response.json();
            setTotalWards(data); // Update totalWards state with fetched count
        } catch (error) {
            console.error('Error fetching total wards:', error);
        }
    };

    const fetchTotalLeaders = async () => {
        try {
            const response = await fetch('http://localhost:1010/auth/leader/count');
            const data = await response.json();
            setTotalLeaders(data); // Update totalWards state with fetched count
        } catch (error) {
            console.error('Error fetching total wards:', error);
        }
    };

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
                {/* Counting Cards */}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '80px' }}>
                    <div style={{ boxShadow: '0 5px 10px rgba(255, 0, 0, 0.3)', padding: '40px', borderRadius: '10px', backgroundColor: ' #34568B' }}>
                        <div style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} />
                            TOTAL-USERS
                        </div>
                        <div style={paraStyle}>05</div>
                    </div>
                    <div style={{ boxShadow: '0 5px 10px rgba(0, 255, 0, 0.3)', padding: '40px', borderRadius: '10px', backgroundColor: '#88B04B' }}>
                        <div style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} />
                            TOTAL-LEADERS
                        </div>
                        <div style={paraStyle}>0{totalLeaders}</div>
                    </div>
                    <div style={{ boxShadow: '0 5px 10px rgba(0, 0, 255,0.3)', padding: '40px', borderRadius: '10px', backgroundColor: ' #D65076' }}>
                        <div style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faChartBar} style={{ marginRight: '10px' }} />
                            TOTAL-WARDS
                        </div>
                        <div style={paraStyle}>0{totalWards}</div>
                    </div>
                    <div style={{ boxShadow: '0 5px 10px rgba(255, 255, 0, 0.3)', padding: '40px', borderRadius: '10px', backgroundColor: '#006B54' }}>
                        <div style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} />
                            TOTAL-MEMBERS
                        </div>
                        <div style={paraStyle}>0{totalMembers}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
