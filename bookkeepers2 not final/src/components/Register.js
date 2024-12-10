import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    const [showPassword, setShowPassword] = useState(false);

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
                toast.success('User registered successfully!', { autoClose: 3000 });
                setTimeout(() => navigate('/login'), 3100); // Redirect after toast
            } else {
                toast.error('Failed to register user. Please try again.', { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.', { autoClose: 3000 });
            console.error('Error:', error);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
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
            <ToastContainer />
        </div>
    );
}

export default Register;
