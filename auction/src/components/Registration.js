import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Registration = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Move these state declarations inside the component
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiEndpoint = 'https://localhost:5001/api/auth/register';
    
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                setSuccess(true);
                onSuccess();
            } else {
                const errorMsg = await response.text();
                setError(`Registration failed: ${errorMsg}`);
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };
    
    // Styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const formGroupStyle = {
        marginBottom: '15px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
    };

    return (
        <div style={containerStyle}>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Registration successful! You can now log in.</p>}
            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label htmlFor="username" style={labelStyle}>Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="password" style={labelStyle}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Log in here</Link>
            </p>
        </div>
    );
};

export default Registration;
