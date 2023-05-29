package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.ingredient.PostNewIngredientRequest;
import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.repository.IngredientRepository;
import com.demobtc.springbootbtc.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    UnitRepository unitRepository;
    
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    public Ingredient getIngredientById(Long id) {
        return ingredientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Ingredient not found with id: " + id)
        );
    }

    public Ingredient createIngredient(PostNewIngredientRequest request) {
        Ingredient ingredientToCreate = new Ingredient();

        ingredientToCreate.setName(request.getName());
        ingredientToCreate.setUnitOfMeasure(unitRepository.findById(request.getUnitOfMeasureId()).orElseThrow(
                () -> new ResourceNotFoundException("Unit not found with id: " + request.getUnitOfMeasureId())
        ));

        return ingredientRepository.save(ingredientToCreate);
    }

    public Ingredient updateIngredient(Ingredient ingredient, Long id) {
        Ingredient ingredientToUpdate = getIngredientById(id);

        if(ingredient.getName() != null){
            ingredientToUpdate.setName(ingredient.getName());
        }
        if(ingredient.getUnitOfMeasure() != null) {
            ingredientToUpdate.setUnitOfMeasure(ingredient.getUnitOfMeasure());
        }

        return ingredientRepository.save(ingredientToUpdate);
    }

    public void deleteIngredient(Long id) {
        Ingredient ingredientToDelete = getIngredientById(id);
        ingredientRepository.delete(ingredientToDelete);
    }



}
