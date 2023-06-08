package com.demobtc.springbootbtc.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Builder
@Table(name = "ingredient")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ing_id")
    private Long id;

    @NotNull
    @Column(name = "ing_name")
    private String name;

    @NotNull
    @Column(name = "ing_min")
    private Double min;

    @NotNull
    @Column(name = "ing_max")
    private Double max;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "un_id")
    private Unit unitOfMeasure;

}
