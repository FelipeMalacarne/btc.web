package com.demobtc.springbootbtc.controller;

import com.demobtc.springbootbtc.dto.request.product.PostNewProductRequest;
import com.demobtc.springbootbtc.model.Product;
import com.demobtc.springbootbtc.repository.ProductRepository;
import com.demobtc.springbootbtc.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testCreateProduct() throws Exception {

        PostNewProductRequest request = new PostNewProductRequest();

        request.setName("Teste");
        request.setPrice(10.2);
        request.setDescription("Teste de produto");
        request.setActive(true);

        // Convert the request object to JSON
        String requestJson = new ObjectMapper().writeValueAsString(request);

        // Perform the POST request
       mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value(request.getName()))
                .andExpect(jsonPath("$.price").value(request.getPrice()))
                .andExpect(jsonPath("$.description").value(request.getDescription()))
                .andExpect(jsonPath("$.active").value(request.isActive()));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testGetAllProducts() throws Exception {
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].id").exists())
                .andExpect(jsonPath("$[0].name").exists())
                .andExpect(jsonPath("$[0].price").exists())
                .andExpect(jsonPath("$[0].ingredients").exists());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testGetProductById() throws Exception {
        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").exists())
                .andExpect(jsonPath("$.price").exists())
                .andExpect(jsonPath("$.ingredients").exists());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testGetProductByIdNotFound() throws Exception {
        mockMvc.perform(get("/api/products/1000"))
                .andExpect(status().isNotFound());
    }



    @Test
    @WithMockUser(roles = "ADMIN")
    public void testUpdateProduct() throws Exception {

        PostNewProductRequest request = new PostNewProductRequest();

        request.setName("Teste");
        request.setPrice(10.2);
        request.setDescription("Teste de produto");
        request.setActive(true);

        ObjectMapper mapper = new ObjectMapper();
        String requestjson = mapper.writeValueAsString(request);

        mockMvc.perform(put("/api/products/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestjson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").exists())
                .andExpect(jsonPath("$.price").exists())
                .andExpect(jsonPath("$.active").exists());

    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testDeleteProduct() throws Exception {
        /// create a new product to delete it
        PostNewProductRequest request = new PostNewProductRequest();

        request.setName("Teste");
        request.setPrice(10.2);
        request.setDescription("Teste de Delete");
        request.setActive(true);

        ObjectMapper mapper = new ObjectMapper();
        String requestjson = mapper.writeValueAsString(request);

        // create product and return id to delete
        MvcResult result = mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestjson))
                .andExpect(status().isOk())
                .andReturn();

        String content = result.getResponse().getContentAsString();
        Product product = mapper.readValue(content, Product.class);
        Long createdId = product.getId();



        mockMvc.perform(delete("/api/products/" + createdId))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/products/" + createdId))
                .andExpect(status().isNotFound());

    }



}
