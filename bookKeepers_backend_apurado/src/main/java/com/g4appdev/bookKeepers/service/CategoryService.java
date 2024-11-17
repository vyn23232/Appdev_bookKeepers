package com.g4appdev.bookKeepers.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.g4appdev.bookKeepers.entity.Category;
import com.g4appdev.bookKeepers.repository.CategoryRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category updateCategory(Integer id, Category newCategoryDetails) {
        return categoryRepository.findById(id).map(category -> {
            category.setCategory_Name(newCategoryDetails.getCategory_Name());
            return categoryRepository.save(category);
        }).orElseThrow(() -> new NoSuchElementException("Category with ID " + id + " not found"));
    }

    public String deleteCategory(Integer id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return "Category with ID " + id + " deleted successfully";
        } else {
            return "Category with ID " + id + " not found!";
        }
    }
}
