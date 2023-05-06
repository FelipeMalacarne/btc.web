package com.demobtc.springbootbtc.dto.request.ingredient;

import com.demobtc.springbootbtc.model.Unit;
import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class PostNewIngredientRequest {

    @NotNull
    private String name;

    @NotNull
    private Unit unitOfMeasure;
}
