package com.demobtc.springbootbtc.dto.response;

import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.model.Ingredient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockMovement {
    private Long id;
    private String accountName;
    private Ingredient ingredient;
    private Double amount;
    private Timestamp date;
    private String type;

}
