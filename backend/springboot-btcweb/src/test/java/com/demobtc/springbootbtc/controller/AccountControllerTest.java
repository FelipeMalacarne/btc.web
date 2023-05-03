package com.demobtc.springbootbtc.controller;


import com.demobtc.springbootbtc.dto.request.PostNewAccountRequest;
import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.model.ERole;
import com.demobtc.springbootbtc.model.Role;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import springfox.documentation.service.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


//tests for the account controller with spring security
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc

public class AccountControllerTest {

    @Autowired
    MockMvc mockMvc;

    // Teste Get sem auth
    @Test
    public void testGetAllAccountsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/accounts"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testGetAllAccounts() throws Exception {
        mockMvc.perform(get("/api/accounts"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].id").exists())
                .andExpect(jsonPath("$[0].name").exists())
                .andExpect(jsonPath("$[0].email").exists());

    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testGetAccountById() throws Exception {
        mockMvc.perform(get("/api/accounts/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testGetAccountByIdNotFound() throws Exception {
        mockMvc.perform(get("/api/accounts/1000"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testPostAccount() throws Exception{

        mockMvc.perform(post("/api/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{" +
                        "\"username\":\"test\"," +
                        "\"email\":\"test@test\"," +
                        "\"password\":\"12345678!\"," +
                        "\"cpf\":\"12345678901\"," +
                        "\"roles\":[{\"id\":1,\"name\":\"ROLE_USER\"}]" +
                        "}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("test"))
                .andExpect(jsonPath("$.email").value("test@test"))


    }

}
