import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Ensure to create a CSS file for styling

const LandingPage = () => {
    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1>Welcome to Book Keepers</h1>
                <p>Your one-stop solution for managing books and categories.</p>
                <Link to="/home" className="landing-btn">Get Started</Link>
            </header>

            <section className="features-section">
                <h2>Features</h2>
                <div className="features-list">
                    <div className="feature-item">
                        <h3>Manage Books</h3>
                        <p>Add, view, and organize your books with ease.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Browse Categories</h3>
                        <p>Explore books by their respective categories to find what you need faster.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Track Your Progress</h3>
                        <p>Keep track of the books you’ve read and your reading goals.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonial-item">
                    <p>"Book Keepers has made it so easy for me to organize my reading list. I love how I can track my progress!"</p>
                    <span>- Christian Jarl Suela, Avid Reader</span>
                </div>
                <div className="testimonial-item">
                    <p>"The categories feature really helped me find books I needed for my research. Highly recommend!"</p>
                    <span>- Calimpong John David, Student</span>
                </div>
            </section>

            <footer className="landing-footer">
                <p>&copy; 2024 Book Keepers | All Rights Reserved</p>
                <p>Contact Us: info@bookkeepers.com</p>
            </footer>
        </div>
    );
}

export default LandingPage;
