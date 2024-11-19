// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Import your dashboard CSS here if you have one

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout logic, like clearing user data and navigating to login
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to the Dashboard!</h2>
            <p>This is your dashboard where you can manage your account and view your information.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
