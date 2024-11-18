import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Books from './components/Books';
import Categories from './components/Categories';
import Home from './components/Home'; // Import the Home component
import './App.css';

function App() {
    const [refreshCount, setRefreshCount] = useState(0);

    const handleCategoryAdded = () => {
        setRefreshCount((count) => count + 1); // Trigger refresh by incrementing
    };

    return (
        <Router>
            <div className="App">
                <header className="app-header">
                    {/* Wrap just the image with a Link */}
                    <Link to="/" className="header-image-link"></Link>
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/view-books">View Books</Link></li>
                            <li><Link to="/view-categories">View Categories</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </ul>
                    </nav>
                </header>

                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/view-books" element={<Books refreshCount={refreshCount} />} />
                    <Route path="/view-categories" element={<Categories onCategoryAdded={handleCategoryAdded} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
