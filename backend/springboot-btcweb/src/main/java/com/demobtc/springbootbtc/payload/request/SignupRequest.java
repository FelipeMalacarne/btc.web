package com.demobtc.springbootbtc.payload.request;

import com.sun.istack.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    @NotNull
    private String username;

    @NotNull
    private String email;

    private Set<String> role;

    @NotNull
    private String password;

}
