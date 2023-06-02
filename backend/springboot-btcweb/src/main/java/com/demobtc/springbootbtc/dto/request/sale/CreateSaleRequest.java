package com.demobtc.springbootbtc.dto.request.sale;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Builder
public class CreateSaleRequest {

    @NotNull
    private Long accountId;

    @NotNull
    private Set<ProductListRequest> productList;


}
