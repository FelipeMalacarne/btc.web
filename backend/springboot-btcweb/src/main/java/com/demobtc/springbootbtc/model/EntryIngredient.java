package com.demobtc.springbootbtc.model;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "entry_ingredient")
@Data
public class EntryIngredient {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entry_id")
    private Long id;

    @Column(name = "entry_amount")
    private Double amount;

    @Column(name = "entry_date")
    private Timestamp entryDate;

    @Column(name = "entry_expiration_date")
    private Timestamp expirationDate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ing_id", referencedColumnName = "ing_id")
    private Ingredient ingredient;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acc_id", referencedColumnName = "acc_id")
    private Account account;

}
