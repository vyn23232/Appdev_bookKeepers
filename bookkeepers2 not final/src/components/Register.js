import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        mname: '',
        course: '',
        email: '',
        phone: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/library/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('User registered successfully');
                navigate('/login');
            } else {
                alert('Failed to register user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev); // Toggle password visibility
    };

    return (
        <div className="register-wrapper">
            <div className="register-container">
                <h1>REGISTER</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-row">
                        <input
                            type="text"
                            name="fname"
                            placeholder="First Name"
                            value={formData.fname}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lname"
                            placeholder="Last Name"
                            value={formData.lname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-row">
                        <input
                            type="text"
                            name="mname"
                            placeholder="Middle Name"
                            value={formData.mname}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="course"
                            placeholder="Course"
                            value={formData.course}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-row">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
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
                    <button type="submit" name="submit-button">Register</button>
                </form>
                <button onClick={handleBackToLogin}>Back to Login</button>
            </div>
        </div>
    );
}

export default Register;
