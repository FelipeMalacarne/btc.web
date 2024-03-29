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
@Table(name = "entry_ingredient")
public class EntryIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entry_id")
    private Long id;

    @NotNull
    @Column(name = "entry_amount")
    private Double amount;

    @NotNull
    @Column(name = "entry_date")
    private Timestamp date;


    @Column(name = "entry_expiration_date")
    private Timestamp expirationDate;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ing_id", referencedColumnName = "ing_id")
    private Ingredient ingredient;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "acc_id", referencedColumnName = "acc_id")
    private Account account;

}
