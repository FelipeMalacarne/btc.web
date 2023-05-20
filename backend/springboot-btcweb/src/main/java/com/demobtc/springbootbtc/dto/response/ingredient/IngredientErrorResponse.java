package com.demobtc.springbootbtc.dto.response.ingredient;

import com.demobtc.springbootbtc.model.Ingredient;


public class IngredientErrorResponse extends Ingredient {
    private String message;

    public IngredientErrorResponse(String message) {
        this.message = message;
    }
}
