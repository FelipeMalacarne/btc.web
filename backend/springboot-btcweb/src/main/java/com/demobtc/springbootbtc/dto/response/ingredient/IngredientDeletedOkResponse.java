package com.demobtc.springbootbtc.dto.response.ingredient;

import com.demobtc.springbootbtc.model.Ingredient;

public class IngredientDeletedOkResponse extends Ingredient {
    private String message;

    public IngredientDeletedOkResponse(String message) {
        this.message = message;
    }
}
