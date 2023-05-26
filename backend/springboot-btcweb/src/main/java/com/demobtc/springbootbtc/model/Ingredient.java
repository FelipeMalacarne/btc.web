package com.demobtc.springbootbtc.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
