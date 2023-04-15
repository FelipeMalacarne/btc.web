package com.demobtc.springbootbtc.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "ingredient")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ing_id")
    private Long id;

    @Column(name = "ing_name")
    private String name;

    @Column(name = "ing_stock_quanti")
    private Integer stockQuantity;

    @Column(name = "ing_expiration_date")
    private String expirationDate;

    @ManyToOne
    @JoinColumn(name = "un_id")
    private Unit unitOfMeasure;



}
