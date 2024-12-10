import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        username: '', // For email
        password: ''
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/library/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password 
                })
            });

            if (response.ok) {
                const data = await response.text(); 
                toast.success(data, { autoClose: 3000 });
                onLogin(); // Update authentication state
                navigate('/home');
            } else {
                const errorText = await response.text(); 
                toast.error(errorText, { autoClose: 3000 });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred during login.', { autoClose: 3000 });
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-welcome">
                <h1>Welcome Back!</h1>
                <p>Your favorite library system is here to serve you.</p>
            </div>
            <div className="login-container">
                <h1>LOGIN</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username (Email)</label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <p>
                        Don't have an account?{' '}
                        <button onClick={() => navigate('/register')}>Create Account</button>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
