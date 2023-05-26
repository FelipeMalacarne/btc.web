package com.demobtc.springbootbtc.controller;

import com.demobtc.springbootbtc.dto.request.ingredient.PostNewIngredientRequest;
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Ingredient> createIngredient(@RequestBody PostNewIngredientRequest request){
        try {
            System.out.println(request);
            Ingredient createdIngredient = ingredientService.createIngredient(request);
            return ResponseEntity.ok(createdIngredient);
        } catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Ingredient> deleteIngredient(@PathVariable(value = "id") Long id){
        try {
            ingredientService.deleteIngredient(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}
