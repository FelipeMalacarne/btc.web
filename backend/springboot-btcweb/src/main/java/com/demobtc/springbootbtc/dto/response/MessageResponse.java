package com.demobtc.springbootbtc.dto.response;

import lombok.Data;

@Data
public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

}
