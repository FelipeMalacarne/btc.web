package com.demobtc.springbootbtc.entity;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "sale")
@Data
public class Sale {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acc_id")
    private Account account;

    @Column(name = "sale_time")
    private Date time;

    @Column(name = "sale_total")
    private Double total;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable (name = "sale_product", joinColumns = @JoinColumn(name="sale_id"),
            inverseJoinColumns = @JoinColumn(name = "prod_id"))
    private Set<Product> requestProdutoSet;

}