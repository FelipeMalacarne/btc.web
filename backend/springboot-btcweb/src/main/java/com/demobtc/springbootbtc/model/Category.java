package com.demobtc.springbootbtc.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "category")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cat_id")
    private Long id;

    @Column(name = "cat_name")
    @Enumerated(EnumType.STRING)
    private ECategory name;

}
