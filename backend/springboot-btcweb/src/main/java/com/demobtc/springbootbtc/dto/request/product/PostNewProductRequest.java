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
    String name;

    String description;

    @NotNull
    Double price;

    @NotNull
    boolean isActive;

    Set<Category> categories;

    List<ProductIngredient> ingredients;

    public PostNewProductRequest(){}

}
