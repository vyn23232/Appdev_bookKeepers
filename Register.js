// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pastel.css';

function Register() {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        mname: '',
        course: '',
        email: '',
        phone: '',
        password: '' 
    });

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
                body: JSON.stringify(formData) 
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
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="fname" placeholder="First Name" value={formData.fname} onChange={handleChange} required />
                <input type="text" name="lname" placeholder="Last Name" value={formData.lname} onChange={handleChange} required />
                <input type="text" name="mname" placeholder="Middle Name" value={formData.mname} onChange={handleChange} />
                <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /> {/* Password field */}
                <button type="submit">Register</button>
            </form>
            <button onClick={handleBackToLogin}>Back to Login</button> {/* Back to Login button */}
        </div>
    );
}

export default Register;
