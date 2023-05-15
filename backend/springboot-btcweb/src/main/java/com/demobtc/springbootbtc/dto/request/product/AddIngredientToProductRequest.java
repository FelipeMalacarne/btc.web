package com.demobtc.springbootbtc.dto.request.product;

import com.demobtc.springbootbtc.model.Ingredient;
import lombok.Data;

@Data
public class AddIngredientToProductRequest {
    private Ingredient ingredient;
    private Double amount;

    public AddIngredientToProductRequest() {
    }
}
