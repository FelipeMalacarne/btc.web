package com.demobtc.springbootbtc.dto.request.sale;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductListRequest {

    private Long productId;

    private Integer quantity;
}
