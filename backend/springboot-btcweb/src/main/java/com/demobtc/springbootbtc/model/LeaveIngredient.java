package com.demobtc.springbootbtc.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Builder
@Table(name = "leave_ingredient")
public class LeaveIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_id")
    private Long id;

    @NotNull
    @Column(name = "leave_amount")
    private Double amount;

    @NotNull
    @Column(name = "leave_date")
    private Timestamp leaveDate;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ing_id", referencedColumnName = "ing_id")
    private Ingredient ingredient;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "acc_id", referencedColumnName = "acc_id")
    private Account account;
}
