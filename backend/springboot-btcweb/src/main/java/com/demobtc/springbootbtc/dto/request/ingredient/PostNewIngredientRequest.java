package com.demobtc.springbootbtc.dto.request.ingredient;


import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Builder
public class PostNewIngredientRequest {

    @NotNull
    private String name;

    @NotNull
    private Double min;

    @NotNull
    private Double max;

    @NotNull
    private Long unitOfMeasureId;

}
