import React, { useEffect, useState } from 'react';
import './BC.css';

const apiUrl = 'http://localhost:8080/api';

const Categories = ({ onCategoryAdded }) => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category_Name: categoryName }),
            });

            if (response.ok) {
                const newCategory = await response.json();
                setCategories((prevCategories) => [...prevCategories, newCategory]);
                setCategoryName(''); // Clear the input field

                // Trigger parent refresh
                if (onCategoryAdded) {
                    onCategoryAdded();
                }
            } else {
                console.error('Error adding category:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await fetch(`${apiUrl}/categories/${id}`, { method: 'DELETE' });
            setCategories((prevCategories) => prevCategories.filter(category => category.category_ID !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="container">
            <h2><i className="fas fa-plus-circle"></i> Add a Category</h2>
            <form onSubmit={handleAddCategory}>
                <input type="text" placeholder="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
                <button type="submit"><i className="fas fa-plus"></i> Add Category</button>
            </form>

            <h2><i className="fas fa-tags"></i> Categories List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Action Buttons</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.category_ID}>
                            <td>{category.category_Name}</td>
                            <td>
                                <button className="action-button delete-button" onClick={() => handleDeleteCategory(category.category_ID)}>
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

export default Categories;
