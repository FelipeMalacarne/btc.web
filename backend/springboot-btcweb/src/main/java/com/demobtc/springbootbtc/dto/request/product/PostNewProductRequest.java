package com.demobtc.springbootbtc.dto.request.product;

import com.demobtc.springbootbtc.model.Category;
import com.demobtc.springbootbtc.model.ProductIngredient;
import com.sun.istack.NotNull;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class PostNewProductRequest {
    @NotNull
    private String name;

    private String description;

    @NotNull
    private Double price;

    @NotNull
    private boolean isActive;

    private Set<Category> categorySet;

    private List<ProductIngredient> ingredientList;

    public PostNewProductRequest(){}

}
