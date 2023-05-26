package com.demobtc.springbootbtc.dto.request.ingredient;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostNewIngredient {
    private String name;
    private Long unitOfMeasureId;
}
