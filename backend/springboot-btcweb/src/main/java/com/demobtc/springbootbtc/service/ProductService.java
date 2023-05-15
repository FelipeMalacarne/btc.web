package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.product.PostNewProductRequest;
import com.demobtc.springbootbtc.dto.request.product.UpdateProductRequest;
import com.demobtc.springbootbtc.model.Category;
import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.model.Product;
import com.demobtc.springbootbtc.model.ProductIngredient;
import com.demobtc.springbootbtc.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private IngredientService ingredientService;

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
        if (request.getCategorySet() != null){
            productToCreate.setCategorySet(request.getCategorySet());
        }
        if(request.getIngredientList() != null ){
            productToCreate.setIngredientList(request.getIngredientList());
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
        if(request.getDescription() != null){
            productToUpdate.setDescription(request.getDescription());
        }
        if(request.getPrice() != null){
            productToUpdate.setPrice(request.getPrice());
        }
        if(request.getCategorySet() != null) {
            productToUpdate.setCategorySet(request.getCategorySet());
        }
        if(request.getIngredientList() != null){
            productToUpdate.setIngredientList(request.getIngredientList());
        }



        productToUpdate.setActive(request.isActive());

        return productRepository.save(productToUpdate);

    }

    public Product deleteProduct(Long id) {
        Product productToDelete = getProductById(id);
        productRepository.delete(productToDelete);
        return productToDelete;
    }

    public Product addIngredientToProduct(Long productId, Ingredient ingredient, Double amount) {
        Product existingProduct = productRepository.findById(productId).orElse(null);
        if(existingProduct == null){
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        } else {
            List<ProductIngredient> ingredientList = existingProduct.getIngredientList();
            ProductIngredient productIngredient = new ProductIngredient();
            productIngredient.setIngredient(ingredient);
            productIngredient.setAmount(amount);
            productIngredient.setProduct(existingProduct);

            ingredientList.add(productIngredient);
            existingProduct.setIngredientList(ingredientList);

            return productRepository.save(existingProduct);
        }
    }

}
