package com.demobtc.springbootbtc.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "drink")
@Data
public class Drink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "drink_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "category")
    private String category;

    @Column(name = "img")
    private String img;


}
