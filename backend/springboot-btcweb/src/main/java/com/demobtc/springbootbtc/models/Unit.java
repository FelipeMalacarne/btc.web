package com.demobtc.springbootbtc.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "unit")
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "un_id")
    private Long id;

    @Column(name = "un_name")
    private String name;

    @Column(name = "un_symbol")
    private String symbol;
}
