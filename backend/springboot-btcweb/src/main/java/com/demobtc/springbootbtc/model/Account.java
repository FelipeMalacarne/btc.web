package com.demobtc.springbootbtc.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Builder
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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(	name = "account_job",
            joinColumns = @JoinColumn(name = "acc_id"),
            inverseJoinColumns = @JoinColumn(name = "job_id"))
    private Set<Role> roles = new HashSet<>();

}
