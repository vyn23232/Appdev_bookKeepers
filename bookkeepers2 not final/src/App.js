import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Books from './components/Books';
import BookList from './components/BookList'; // Import the BookList component
import Categories from './components/Categories';
import CategoryList from './components/CategoryList'; // Import the CategoryList component
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage'; // Import the Landing Page component
import './App.css';

function App() {
    const [refreshCount, setRefreshCount] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleCategoryAdded = () => {
        setRefreshCount((count) => count + 1);
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                <header className="app-header">
                    <Link to="/home" className="header-image-link"></Link>
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/book-list">Book List</Link></li> {/* Link to BookList component */}
                            <li><Link to="/category-list">Category List</Link></li> {/* Link to CategoryList component */}
                            <li><Link to="/manage-books">Manage Books</Link></li>
                            <li><Link to="/manage-categories">Manage Categories</Link></li>
                            {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
                            {isAuthenticated && <li onClick={handleLogout}><Link to="/landing">Logout</Link></li>}
                        </ul>
                    </nav>
                </header>

                <Routes>
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="/home" element={<Home isAuthenticated={isAuthenticated} />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/manage-books" element={<Books refreshCount={refreshCount} />} />
                    <Route path="/book-list" element={<BookList refreshCount={refreshCount} />} />
                    <Route path="/manage-categories" element={<Categories onCategoryAdded={handleCategoryAdded} />} />
                    <Route path="/category-list" element={<CategoryList refresh={refreshCount} />} /> {/* Add the route for CategoryList */}
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
