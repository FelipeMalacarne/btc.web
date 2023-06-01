package com.demobtc.springbootbtc.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Builder
@ToString
@Table(name = "sale")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "acc_id", nullable = false)
    private Account account;

    @NotNull
    @Column(name = "sale_time")
    private Timestamp time;

    @NotNull
    @Column(name = "sale_total")
    private Double total;

    @JsonManagedReference
    @OneToMany(mappedBy = "sale", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SaleProduct> saleProducts = new ArrayList<>();

    public void addSaleProduct(SaleProduct saleProduct) {
        saleProducts.add(saleProduct);
        saleProduct.setSale(this);
    }
    public void removeSaleProduct(SaleProduct saleProduct) {
        saleProduct.setSale(null);
        saleProducts.remove(saleProduct);
    }

}