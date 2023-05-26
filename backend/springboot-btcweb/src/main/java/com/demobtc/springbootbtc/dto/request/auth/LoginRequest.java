package com.demobtc.springbootbtc.dto.request.auth;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class LoginRequest {

    @NotNull
    private String name;

    @NotNull
    private String password;


}
