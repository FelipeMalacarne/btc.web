package com.demobtc.springbootbtc.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "product")
@Data
public class Product {

    public Product(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_id")
    private Long id;

    @NotNull
    @Column(name = "prod_name")
    private String name;

    @Column(name = "prod_description")
    private String description;

    @Column(name = "prod_price")
    private Double price;

    @NotNull
    @Column(name = "prod_active")
    private boolean isActive;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(	name = "product_category",
            joinColumns = @JoinColumn(name = "prod_id"),
            inverseJoinColumns = @JoinColumn(name = "cat_id"))
    private Set<Category> categorySet = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductIngredient> ingredientList;


}
