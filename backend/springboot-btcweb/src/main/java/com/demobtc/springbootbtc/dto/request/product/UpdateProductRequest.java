package com.demobtc.springbootbtc.dto.request.product;

import com.demobtc.springbootbtc.model.Category;
import com.demobtc.springbootbtc.model.ProductIngredient;
import lombok.Data;

import java.util.List;
import java.util.Set;


@Data
public class UpdateProductRequest {
    private String name;

    private String description;

    private Double price;

    private boolean isActive;

    private Set<Category> categorySet;

    private List<ProductIngredient> ingredientList;

    public UpdateProductRequest(){}




}
