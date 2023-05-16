package com.demobtc.springbootbtc.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "product_ingredient")
@Data
public class ProductIngredient {

    public ProductIngredient() {}


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_ing_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prod_id")
    @JsonBackReference
    private Product product;

    @ManyToOne
    @JoinColumn(name = "ing_id")
    private Ingredient ingredient;

    @Column(name = "prod_ing_amount")
    private Double amount;


}
