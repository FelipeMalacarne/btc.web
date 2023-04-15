package com.demobtc.springbootbtc.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "product_category")
@Data
public class Category {
    @ManyToOne
    @JoinColumn(name="product_id", nullable=false)
    private Product product;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_cat_id")
    private Long id;

    @Column(name = "cat_name")
    private String name;

}
