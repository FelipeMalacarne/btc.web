package com.demobtc.springbootbtc.entity;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
@Entity
@Table(name = "request_product")
@Data
public class RequestProduct {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "req_id")
    private Long id;

    @NotNull
    @Column(name = "req_prod_amount")
    private Long amount;

    @ManyToOne
    @JoinColumn(name = "req_id", nullable = false)
    private Request request;

    @ManyToOne
    @JoinColumn(name = "prod_id", nullable = false)
    private  Product product;

}