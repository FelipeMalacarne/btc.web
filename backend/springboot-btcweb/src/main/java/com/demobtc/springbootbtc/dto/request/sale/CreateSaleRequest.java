package com.demobtc.springbootbtc.dto.request.sale;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateSaleRequest {

    private Long accId;

    private Set<ProductListRequest> productList;


}
