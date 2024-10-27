import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Login = ({ onSuccess }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiEndpoint = 'https://localhost:5001/api/auth/login'; // Replace with actual API endpoint

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                await response.json();
                setSuccess(true);
                onSuccess(); // Notify parent component of successful login
            } else {
                const errorMsg = await response.text();
                setError(`Login failed: ${errorMsg}`);
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };

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
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Login successful!</p>}
            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
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
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
