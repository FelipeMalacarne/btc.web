package com.demobtc.springbootbtc.dto.request.stock;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class LeaveRequest {
    @NotNull
    private Double amount;

    @NotNull
    private Long ingredientId;

    @NotNull
    private Long accountId;

   @NotNull
   private Timestamp leaveDate;
}
