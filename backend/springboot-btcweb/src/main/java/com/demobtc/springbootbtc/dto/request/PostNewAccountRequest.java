package com.demobtc.springbootbtc.dto.request;

import com.demobtc.springbootbtc.model.Role;
import com.sun.istack.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class PostNewAccountRequest {

    @NotNull
    String username;

    @NotNull
    String cpf;

    @NotNull
    String email;

    @NotNull
    String password;

    @NotNull
    Set<Role> roles;

    public PostNewAccountRequest(){}

    public PostNewAccountRequest(String username, String cpf, String email, String password, Set<Role> roles) {
        this.username = username;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}
