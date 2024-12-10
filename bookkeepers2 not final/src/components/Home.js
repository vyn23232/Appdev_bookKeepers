import React from 'react';
import './Home.css'


const Home = ({ isAuthenticated }) => {
    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Welcome to Book Keepers</h1>
                <p>Your one-stop solution for managing books and categories.</p>
            </div>
            
            <div className="home-image">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Books" />
            </div>
            
            <div className="home-content">
                <p>
                    Start by exploring the available books or browse through the categories. 
                    Manage your library efficiently, add new categories, and more—all in one place!
                </p>
                <button className="home-btn">Explore!</button>
            </div>
            
            <div className="about-us">
                <h2>About Us</h2>
                <p>
                    Book Keepers is dedicated to making the process of managing and tracking books easier and more organized. 
                    Whether you're an avid reader, a student, or a library manager, we provide the tools you need to track progress, 
                    organize categories, and manage your reading materials efficiently.
                </p>
            </div>
            
            <div className="features">
                <div className="feature">
                    <h3>Manage Books</h3>
                    <p>Add, view, and organize your books with ease.</p>
                </div>
                <div className="feature">
                    <h3>Browse Categories</h3>
                    <p>Explore books by their respective categories to find what you need faster.</p>
                </div>
                <div className="feature">
                    <h3>Track Your Progress</h3>
                    <p>Keep track of the books you’ve read and your reading goals.</p>
                </div>
            </div>

            <div className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial">
                    <p>"Book Keepers has made it so easy for me to organize my reading list. I love how I can track my progress!"</p>
                    <span>- Christian Jarl Suela, Avid Reader</span>
                </div>
                <div className="testimonial">
                    <p>"The categories feature really helped me find books I needed for my research. Highly recommend!"</p>
                    <span>- Calimpong John David, Student</span>
                </div>
            </div>

            <div className="cta">
                <h2>Stay Updated</h2>
                <p>Subscribe to our newsletter for the latest updates and tips on managing your library.</p>
                <button className="home-btn">Subscribe Now</button>
            </div>

            <footer>
                <p>&copy; 2024 Book Keepers | All Rights Reserved</p>
                <p>Contact Us: info@bookkeepers.com</p>
            </footer>
        </div>
    );
};

export default Home;
