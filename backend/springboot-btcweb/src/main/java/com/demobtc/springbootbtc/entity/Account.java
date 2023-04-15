package com.demobtc.springbootbtc.entity;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "acc_id")
    private Long id;

    @NotNull
    @Column(name = "acc_name")
    private String name;

    @NotNull
    @Column(name = "acc_cpf")
    private String cpf;

    @NotNull
    @Column(name = "acc_email")
    private String email;

    @NotNull
    @Column(name = "acc_password")
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "account_job",
            joinColumns = @JoinColumn(name = "acc_id"),
            inverseJoinColumns = @JoinColumn(name = "job_id"))
    private Set<Job> roles = new HashSet<>();

}
