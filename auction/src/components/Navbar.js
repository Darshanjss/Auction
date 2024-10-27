// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [hoveredLink, setHoveredLink] = useState(null);

    const handleMouseEnter = (link) => {
        setHoveredLink(link);
    };

    const handleMouseLeave = () => {
        setHoveredLink(null);
    };

    return (
        <nav style={navStyle}>
            <h1 style={titleStyle}>Online Auction</h1>
            <div style={linkContainerStyle}>
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onMouseEnter={() => handleMouseEnter(link.path)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            ...linkStyle,
                            color: hoveredLink === link.path ? 'yellow' : 'white', // Change color on hover
                        }}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

// Define the links
const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Auction', path: '/auction' },
    { name: 'Bidding', path: '/bidding' },
    { name: 'Profile', path: '/profile' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
];

// Styles
const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: 'green',
    color: 'white',
};

const titleStyle = {
    margin: '0',
};

const linkContainerStyle = {
    display: 'flex',
    gap: '15px',
};

const linkStyle = {
    textDecoration: 'none',
    transition: 'color 0.3s', // Smooth transition for color change
};

export default Navbar;
