// src/Profile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Profile = () => {
    const navigate = useNavigate();
    
    // User information (mock data for now)
    const [userInfo, setUserInfo] = useState({
        username: 'JohnDoe',
        email: 'johndoe@example.com',
    });

    // User auction items and bids (mock data for now)
    const [userItems, setUserItems] = useState([
        {
            id: 1,
            title: 'Antique Vase',
            description: 'A beautiful antique vase from the 18th century.',
            currentBid: 150,
        },
        {
            id: 2,
            title: 'Vintage Watch',
            description: 'A vintage watch in excellent condition.',
            currentBid: 300,
        },
    ]);

    const handleLogout = () => {
        // Add logout functionality here (e.g., clear tokens, redirect to login)
        navigate('/'); // Redirect to home after logout
    };

    return (
        <div style={containerStyle}>
             <Navbar />
            <h1 style={headerStyle}>User Profile</h1>
            <div style={infoStyle}>
                <h2>User Information</h2>
                <p>Username: {userInfo.username}</p>
                <p>Email: {userInfo.email}</p>
            </div>

            <div style={itemsStyle}>
                <h2>Your Auction Items</h2>
                <ul style={listStyle}>
                    {userItems.length > 0 ? (
                        userItems.map(item => (
                            <li key={item.id} style={itemStyle}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>Current Bid: ${item.currentBid}</p>
                            </li>
                        ))
                    ) : (
                        <p>No auction items found.</p>
                    )}
                </ul>
            </div>

            <button onClick={handleLogout} style={buttonStyle}>
                Logout
            </button>
        </div>
    );
};

// Styles (adjust these as necessary)
const containerStyle = {
    padding: '20px',
};

const headerStyle = {
    marginBottom: '10px',
};

const infoStyle = {
    marginBottom: '20px',
};

const itemsStyle = {
    marginBottom: '20px',
};

const listStyle = {
    listStyleType: 'none',
    padding: '0',
};

const itemStyle = {
    border: '1px solid #ccc',
    margin: '10px 0',
    padding: '10px',
};

const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default Profile;
