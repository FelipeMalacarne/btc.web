package com.demobtc.springbootbtc.dto.request.product;

import lombok.Data;

@Data
public class IngredientToProductRequest {

    private Long ingredientId;

    private Double amount;

    public IngredientToProductRequest() {}
}
