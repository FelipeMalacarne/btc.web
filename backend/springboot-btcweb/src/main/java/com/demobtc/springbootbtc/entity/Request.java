package com.demobtc.springbootbtc.entity;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "reque    st")
@Data
public class Request {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "req_id")
    private Long id;

//    @NotNull
//    @JoinColumn (name = "acc_id")
//    private Account account;

    @Column(name = "req_time")
    private Date time;

    @Column(name = "req_total")
    private Double total;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable (name = "request_product", joinColumns = @JoinColumn(name="request_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<RequestProduct> requestProdutoSet;

}