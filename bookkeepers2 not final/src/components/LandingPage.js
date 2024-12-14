import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Sitting from '../assets/images/Sitting.png'; // Import the image

const LandingPage = () => {
    return (
        <div className="landing-container">
            <header className="landing-header">
                <div className="header-content">
                    <h1>Online Library</h1>
                    <p>Your gateway to thousands of books and resources</p>
                    <Link to="/home" className="landing-btn">Join Now</Link>
                </div>
                <div className="header-image">
                    <img src={Sitting} alt="Illustration of a person reading" />
                </div>
            </header>
        </div>
    );
}

export default LandingPage;
