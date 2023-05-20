package com.demobtc.springbootbtc.controller;

import com.demobtc.springbootbtc.dto.response.ingredient.IngredientDeletedOkResponse;
import com.demobtc.springbootbtc.dto.response.ingredient.IngredientErrorResponse;
import com.demobtc.springbootbtc.dto.response.product.ProductErrorResponse;
import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/ingredients")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @GetMapping
    public ResponseEntity<List<Ingredient>> getAllIngredients(){
        try {
            List<Ingredient> ingredientList = ingredientService.getAllIngredients();
            return ResponseEntity.ok(ingredientList);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            List<Ingredient> emptyList = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable(value = "id") Long id){
        try {
            Ingredient ingredient = ingredientService.getIngredientById(id);
            return ResponseEntity.ok(ingredient);
        } catch (ResourceNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e){
            IngredientErrorResponse ingredientErrorResponse = new IngredientErrorResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ingredientErrorResponse);
        }
    }

    @PostMapping
    public ResponseEntity<Ingredient> createIngredient(@RequestBody Ingredient ingredient){
        try {
            Ingredient createdIngredient = ingredientService.createIngredient(ingredient);
            return ResponseEntity.ok(createdIngredient);
        } catch (Exception e){
            IngredientErrorResponse ingredientErrorResponse = new IngredientErrorResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ingredientErrorResponse);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingredient> updateIngredient(
            @RequestBody Ingredient ingredient,
            @PathVariable(value = "id") Long id
    ){
        try {
            Ingredient updatedIngredient = ingredientService.updateIngredient(ingredient, id);
            return ResponseEntity.ok(updatedIngredient);
        } catch (ResourceNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e){
            IngredientErrorResponse ingredientErrorResponse = new IngredientErrorResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ingredientErrorResponse);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Ingredient> deleteIngredient(@PathVariable(value = "id") Long id){
        try {
            ingredientService.deleteIngredient(id);
            IngredientDeletedOkResponse ingredientDeletedOkResponse = new IngredientDeletedOkResponse(
                    "Ingredient deleted successfully");
            return ResponseEntity.ok(ingredientDeletedOkResponse);
        } catch (ResourceNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e){
            IngredientErrorResponse ingredientErrorResponse = new IngredientErrorResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ingredientErrorResponse);

        }
    }



}
