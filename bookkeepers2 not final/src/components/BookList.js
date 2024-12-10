import React, { useEffect, useState } from 'react';
import './BookList.css'; // Import the styles

const apiUrl = 'http://localhost:8080/api';

const BookList = ({ refreshCount }) => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [refreshCount]);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${apiUrl}/books`);
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredBooks = books.filter((book) => {
        return (
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="book-list-container">
            <h2 className="book-list-heading">
                <i className="fas fa-list"></i> Browse Books
            </h2>

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by title or author..."
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="book-cards-container">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div key={book.book_ID} className="book-card">
                            <div className="card-header">
                                <h3>{book.title}</h3>
                                <span className="book-category">
                                    {categories.find(
                                        (c) => c.category_ID === book.category
                                    )?.category_Name || 'Unknown'}
                                </span>
                            </div>
                            <div className="card-body">
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Publisher:</strong> {book.publisher}</p>
                                <p><strong>Published:</strong> {book.publish_date}</p>
                            </div>
                            <div className="card-footer">
                                <button className="details-button">View Details</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-books">No books found.</p>
                )}
            </div>
        </div>
    );
};

export default BookList;
