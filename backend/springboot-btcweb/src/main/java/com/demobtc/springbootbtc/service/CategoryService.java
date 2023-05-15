package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.model.Category;
import com.demobtc.springbootbtc.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category category) {
        Category categoryToUpdate = categoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Category not found with id: " + id));
        categoryToUpdate.setName(category.getName());
        return categoryRepository.save(categoryToUpdate);
    }

    public void deleteCategory(Long id) {
        Category categoryToDelete = categoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Category not found with id: " + id));
        categoryRepository.delete(categoryToDelete);
    }

    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }
}
