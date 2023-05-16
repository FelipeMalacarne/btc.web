package com.demobtc.springbootbtc.dto.request.product;

import lombok.Data;

import java.util.List;
import java.util.Set;


@Data
public class ProductRequest {
    private String name;

    private String description;

    private Double price;

    private boolean isActive;

    private Set<CategoryToProductRequest> categorySet;

    private List<IngredientToProductRequest> ingredientList;

    public ProductRequest(){}




}
