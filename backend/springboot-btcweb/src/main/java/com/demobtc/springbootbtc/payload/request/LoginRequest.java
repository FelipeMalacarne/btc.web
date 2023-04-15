package com.demobtc.springbootbtc.payload.request;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class LoginRequest {

    @NotNull
    private String name;

    @NotNull
    private String password;


}
