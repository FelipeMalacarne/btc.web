package com.demobtc.springbootbtc.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Builder
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

    @OneToMany(mappedBy = "sale", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SaleProduct> saleProducts = new HashSet<>();

    public void addSaleProduct(SaleProduct saleProduct) {
        saleProducts.add(saleProduct);
        saleProduct.setSale(this);
    }
    public void removeSaleProduct(SaleProduct saleProduct) {
        saleProduct.setSale(null);
        saleProducts.remove(saleProduct);
    }

}