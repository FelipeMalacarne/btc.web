package com.demobtc.springbootbtc.dto.request.account;

import com.demobtc.springbootbtc.model.Role;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostNewAccountRequest {

    @NotNull
    private String username;

    @NotNull
    private String cpf;

    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    private Set<RoleSetRequest> roles;

}
