import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function LibrarianLogin({ onLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/librarians/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            if (response.ok) {
                const data = await response.text(); // Success message from backend
                toast.success('Login Successful!', { autoClose: 3000 });
                onLogin(); // Call parent function to update authentication state
                navigate('/home'); // Navigate to librarian's dashboard
            } else {
                const errorText = await response.text(); // Error message from backend
                toast.error(errorText, { autoClose: 3000 });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred during login.', { autoClose: 3000 });
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="login-wrapper">
            <div className="login-welcome">
                <h1>Welcome, Librarian!</h1>
                <p>Manage the library system with ease.</p>
            </div>
            <div className="login-container">
                <h1>LIBRARIAN LOGIN</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <i
                            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle-icon`}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <button onClick={handleBackToLogin}>Back to Login</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LibrarianLogin;
