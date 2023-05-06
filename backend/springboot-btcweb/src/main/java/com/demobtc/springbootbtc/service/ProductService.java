package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.product.PostNewProductRequest;
import com.demobtc.springbootbtc.dto.request.product.UpdateProductRequest;
import com.demobtc.springbootbtc.model.Product;
import com.demobtc.springbootbtc.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

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
        if (request.getDescription() != null){
            productToCreate.setDescription(request.getDescription());
        }
        if (request.getCategories() != null){
            productToCreate.setCategorieSet(request.getCategories());
        }
        if(request.getIngredients() != null ){
            productToCreate.setIngredientsList(request.getIngredients());
        }

        productToCreate.setPrice(request.getPrice());
        productToCreate.setActive(request.isActive());


        return productRepository.save(productToCreate);
    }

    public Product updateProduct(UpdateProductRequest request, Long id) {
        Product productToUpdate = getProductById(id);

        if(request.getName() != null){
            productToUpdate.setName(request.getName());
        }
        if(request.getDescription() != null) {
            productToUpdate.setDescription(request.getDescription());
        }
        if(request.getPrice() != null) {
            productToUpdate.setPrice(request.getPrice());
        }
        if(request.getCategories() != null) {
            productToUpdate.setCategorieSet(request.getCategories());
        }
        if(request.getIngredients() != null) {
            productToUpdate.setIngredientsList(request.getIngredients());
        }

        productToUpdate.setActive(request.isActive());

        return productRepository.save(productToUpdate);
    }

    public Product deleteProduct(Long id) {
        Product productToDelete = getProductById(id);
        productRepository.delete(productToDelete);
        return productToDelete;
    }

}
