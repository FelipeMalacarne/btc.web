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
}
