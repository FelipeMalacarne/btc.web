package com.demobtc.springbootbtc.dto.request.product;

import com.demobtc.springbootbtc.model.Category;
import com.demobtc.springbootbtc.model.ProductIngredient;
import lombok.Data;

import java.util.List;
import java.util.Set;


@Data
public class UpdateProductRequest {
    String name;

    String description;

    Double price;

    boolean isActive;

    Set<Category> categories;

    List<ProductIngredient> ingredients;

    public UpdateProductRequest(){}




}
