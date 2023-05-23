package com.demobtc.springbootbtc.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "sale")
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
    private Timestamp time;

    @Column(name = "sale_total")
    private Double total;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable (name = "sale_product", joinColumns = @JoinColumn(name="sale_id"),
            inverseJoinColumns = @JoinColumn(name = "prod_id"))
    private Set<Product> saleProdutoSet;

}