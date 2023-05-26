package com.demobtc.springbootbtc.dto.request.account;

import com.demobtc.springbootbtc.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UpdateAccountRequest {

    String name;

    String cpf;

    String email;

    String password;

    Set<Role> roles;

    public UpdateAccountRequest(){}

    public UpdateAccountRequest(String name, String cpf, String email, String password, Set<Role> roles) {
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

}
