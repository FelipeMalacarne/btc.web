package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.PostNewProductRequest;
import com.demobtc.springbootbtc.model.Category;
import com.demobtc.springbootbtc.model.Product;
import com.demobtc.springbootbtc.model.ProductIngredient;
import com.demobtc.springbootbtc.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public Product createProduct(PostNewProductRequest request) {
        Product productToCreate = new Product();
        productToCreate.setName(request.getName());
        productToCreate.setDescription(request.getDescription());
        productToCreate.setPrice(request.getPrice());
        productToCreate.setActive(request.isActive());
        productToCreate.setCategories(request.getCategories());
        productToCreate.setIngredients(request.getIngredients());

        return productRepository.save(productToCreate);
    }

    public Product updateProduct(Product product, Long id) {
        Product productToUpdate = getProductById(id);
        productToUpdate.setName(product.getName());
        productToUpdate.setDescription(product.getDescription());
        productToUpdate.setPrice(product.getPrice());
        productToUpdate.setActive(product.isActive());
        productToUpdate.setCategories(product.getCategories());
        productToUpdate.setIngredients(product.getIngredients());

        return productRepository.save(productToUpdate);
    }

    public Product deleteProduct(Long id) {
        Product productToDelete = getProductById(id);
        productRepository.delete(productToDelete);
        return productToDelete;
    }

}
