package com.demobtc.springbootbtc.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "un_id")
    private Unit unitOfMeasure;



}
