import React, { useEffect, useState } from 'react';
import './CategoryList.css';

const apiUrl = 'http://localhost:8080/api';

const CategoryList = ({ refresh }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, [refresh]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div className="category-list-container">
            <h2 className="categories-heading"><i className="fas fa-tags"></i> Categories List</h2>
            {categories.length > 0 ? (
                <div className="category-cards-container">
                    {categories.map(category => (
                        <div className="category-card" key={category.category_ID}>
                            <h3 className="category-name">{category.category_Name}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-categories">No categories available.</div>
            )}
        </div>
    );
};

export default CategoryList;
