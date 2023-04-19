package com.demobtc.springbootbtc.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product_ingredient")
@Data
public class ProductIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_ing_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prod_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "ing_id")
    private Ingredient ingredient;

    @Column(name = "prod_ing_amount")
    private BigDecimal amount;

}
