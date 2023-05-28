package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.model.Stock;
import com.demobtc.springbootbtc.model.Unit;
import com.demobtc.springbootbtc.repository.StockRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class StockServiceTests {

    @Mock
    private StockRepository stockRepository;

    @InjectMocks
    private StockService stockService;


    @Test
    public void testGetAllStocks() {
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

        // Configure mock repository
        Mockito.when(stockRepository.findAll()).thenReturn(mockStocks);

        // Call the service method
        List<Stock> result = stockService.getAllStocks();

        // Verify the result
        Assert.assertEquals(mockStocks.size(), result.size());
        Assert.assertEquals(stock1.getAmount(), result.get(0).getAmount());
        Assert.assertEquals(stock2.getAmount(), result.get(1).getAmount());
        Assert.assertEquals(stock1.getIngredient().getName(), result.get(0).getIngredient().getName());
        Assert.assertEquals(stock2.getIngredient().getName(), result.get(1).getIngredient().getName());

        // Verify that the repository method was called
        Mockito.verify(stockRepository, Mockito.times(1)).findAll();
    }

}
