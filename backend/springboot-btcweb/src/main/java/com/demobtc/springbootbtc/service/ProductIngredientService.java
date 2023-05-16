package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.model.ProductIngredient;
import com.demobtc.springbootbtc.repository.ProductIngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductIngredientService {

    @Autowired
    private ProductIngredientRepository productIngredientRepository;

    public List<ProductIngredient> getAllProductIngredients() {
        return productIngredientRepository.findAll();
    }

    public ProductIngredient getProductIngredientById(Long id) {
        return productIngredientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ProductIngredient not found with id: " + id));
    }

    public ProductIngredient createProductIngredient(ProductIngredient productIngredient) {
        return productIngredientRepository.save(productIngredient);
    }

    public ProductIngredient updateProductIngredient(ProductIngredient productIngredient, Long id) {
        ProductIngredient productIngredientToUpdate = productIngredientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ProductIngredient not found with id: " + id));

        productIngredientToUpdate.setProduct(productIngredient.getProduct());
        productIngredientToUpdate.setIngredient(productIngredient.getIngredient());
        productIngredientToUpdate.setAmount(productIngredient.getAmount());

        return productIngredientRepository.save(productIngredientToUpdate);
    }

    public void deleteProductIngredient(Long id) {
        ProductIngredient productIngredientToDelete = productIngredientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ProductIngredient not found with id: " + id));

        productIngredientRepository.delete(productIngredientToDelete);
    }

}
