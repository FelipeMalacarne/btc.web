package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.ingredient.PostNewIngredientRequest;
import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {

    @Autowired
    IngredientRepository ingredientRepository;
    
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    public Ingredient getIngredientById(Long id) {
        return ingredientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Ingredient not found with id: " + id)
        );
    }

}
