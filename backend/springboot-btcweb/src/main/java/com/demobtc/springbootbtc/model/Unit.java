package com.demobtc.springbootbtc.model;

import com.sun.istack.NotNull;
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

    @NotNull
    @Column(name = "un_name")
    private String name;

    @NotNull
    @Column(name = "un_symbol")
    private String symbol;

    public Unit() {}

    public Unit(String name, String symbol) {
        this.name = name;
        this.symbol = symbol;
    }

}
