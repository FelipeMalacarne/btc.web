package com.demobtc.springbootbtc.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "job")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Long id;

    @Column(name = "job_name")
    @Enumerated(EnumType.STRING)
    private ERole name;


    public Role(){}
    public Role(ERole name) {
        this.id = (long) name.ordinal() + 1;
        this.name = name;
    }

}
