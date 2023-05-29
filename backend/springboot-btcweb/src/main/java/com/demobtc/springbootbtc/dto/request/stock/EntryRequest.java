package com.demobtc.springbootbtc.dto.request.stock;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class EntryRequest {
    @NotNull
    private Double amount;

    @NotNull
    private Timestamp entryDate;


    private Timestamp expirationDate;

    @NotNull
    private Long ingredientId;

    @NotNull
    private Long accountId;
}
