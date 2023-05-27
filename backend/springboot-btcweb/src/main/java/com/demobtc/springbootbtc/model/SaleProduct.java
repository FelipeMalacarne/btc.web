package com.demobtc.springbootbtc.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = "product")
@Table(name = "sale_product")
public class SaleProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_prod_id")
    private Long id;

    @NotNull
    @Column(name = "sale_prod_amount")
    private Integer amount;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "prod_id")
    @JsonBackReference
    private Product product;


}
