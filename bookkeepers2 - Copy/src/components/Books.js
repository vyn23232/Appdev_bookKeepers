import React, { useEffect, useState } from 'react';
import './BC.css';

const apiUrl = 'http://localhost:8080/api';
// test
const Books = ({ refreshCount }) => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publisher: '',
        publish_date: '',
        category: '',
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    // Fetch categories when refreshCount changes or on initial load
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = formData.book_ID ? 'PUT' : 'POST';
        const url = formData.book_ID ? `${apiUrl}/books/${formData.book_ID}` : `${apiUrl}/books`;

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            setFormData({ title: '', author: '', publisher: '', publish_date: '', category: '' });
            fetchBooks();
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    const handleDeleteWithConfirmation = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this record?');
    
        if (isConfirmed) {
            try {
                await fetch(`${apiUrl}/books/${id}`, { method: 'DELETE' });
                fetchBooks();
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    const handleUpdateWithConfirmation = (book) => {
        const isConfirmed = window.confirm('Are you sure you want to update this record?');
    
        if (isConfirmed) {
            setFormData(book); // Set the form data with the book's data for updating
        }
    };

    return (
        <div className="container">
            <h2><i className="fas fa-plus"></i> Add a Book</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
                <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleInputChange} required />
                <input type="text" name="publisher" placeholder="Publisher" value={formData.publisher} onChange={handleInputChange} required />
                <input type="date" name="publish_date" value={formData.publish_date} onChange={handleInputChange} required />
                <select name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.category_ID} value={category.category_ID}>
                            {category.category_Name}
                        </option>
                    ))}
                </select>
                <button type="submit"><i className="fas fa-plus-circle"></i> Add Book</button>
            </form>

            <h2><i className="fas fa-list"></i> Books List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Publish Date</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.book_ID}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.publish_date}</td>
                            <td>{categories.find((c) => c.category_ID === book.category)?.category_Name || 'Unknown'}</td>
                            <td>
                                <button 
                                    className="action-button update-button" 
                                    onClick={() => handleUpdateWithConfirmation(book)}
                                >
                                    <i className="fas fa-edit"></i> Update
                                </button>
                                <button 
                                    className="action-button delete-button" 
                                    onClick={() => handleDeleteWithConfirmation(book.book_ID)}
                                >
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
