package com.demobtc.springbootbtc.models;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

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
    private Timestamp expirationDate;

    @ManyToOne
    @JoinColumn(name = "un_id")
    private Unit unitOfMeasure;

    @OneToMany(mappedBy = "ingredient")
    private List<ProductIngredient> products;



}
