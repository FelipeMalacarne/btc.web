package com.demobtc.springbootbtc.controller;

import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.model.Stock;
import com.demobtc.springbootbtc.model.Unit;
import com.demobtc.springbootbtc.service.StockService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class StockController {

    private MockMvc mockMvc;

    @Mock
    private StockService stockService;

    @InjectMocks
    private StockController stockController;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(stockController).build();
    }

    @Test
    public void testGetAllStocks() throws Exception {
        // Mock data
        Unit unit = new Unit();
        unit.setId(1L);
        unit.setName("Grams");
        unit.setSymbol("g");

        Ingredient ingredient = new Ingredient();
        ingredient.setId(1L);
        ingredient.setName("Ingredient 1");
        ingredient.setUnitOfMeasure(unit);

        Stock stock1 = new Stock();
        stock1.setId(1L);
        stock1.setAmount(100.0);
        stock1.setIngredient(ingredient);

        Stock stock2 = new Stock();
        stock2.setId(2L);
        stock2.setAmount(200.0);
        stock2.setIngredient(ingredient);

        List<Stock> mockStocks = Arrays.asList(stock1, stock2);

        // Configure mock service
        Mockito.when(stockService.getAllStocks()).thenReturn(mockStocks);

        // Perform the GET request
        mockMvc.perform(MockMvcRequestBuilders.get("/api/stocks"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(mockStocks.size()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].amount").value(stock1.getAmount()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].ingredient.name").value(stock1.getIngredient().getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].amount").value(stock2.getAmount()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].ingredient.name").value(stock2.getIngredient().getName()));

        // Verify that the service method was called
        Mockito.verify(stockService, Mockito.times(1)).getAllStocks();
    }
}
