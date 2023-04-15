package com.demobtc.springbootbtc.payload.request;

import com.sun.istack.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    @NotNull
    private String name;

    @NotNull
    private String cpf;

    @NotNull
    private String email;

    @NotNull
    private String password;


    private Set<String> job;

}
