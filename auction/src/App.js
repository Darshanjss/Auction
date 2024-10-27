// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import Auction from './components/Auction';
import Bidding from './components/Bidding';
import Profile from './components/Profile';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleRegisterSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/auction" element={isAuthenticated ? <Auction /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
                    <Route path="/register" element={<Registration onSuccess={handleRegisterSuccess} />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/" element={<Home />} />
                <Route path="/auction" element={<Auction />} />
                <Route path="/bidding" element={<Bidding />} />
                <Route path="/profile" element={<Profile />}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;