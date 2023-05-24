package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.model.Stock;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@Transactional
@RunWith(SpringRunner.class)
public class StockRepositoryTests {

    @Autowired
    StockRepository stockRepository;

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    UnitRepository unitRepository;

    Stock stock;
    Ingredient ingredient;

    @Before
    public void setup() {
         ingredient = Ingredient.builder()
                .name("TesteIngredientSetup")
                .unitOfMeasure(unitRepository.findById(1L).orElse(null))
                .build();
        stock = Stock.builder()
                .amount(10.0)
                .ingredient(ingredientRepository.findById(1L).orElse(null))
                .build();
    }

    @Test
    public void givenStockObject_whenSave_thenReturnSavedStock(){
        // given
        Ingredient savedIngredient = ingredientRepository.save(ingredient);
        Stock stockToSave = Stock.builder()
                .amount(10.0)
                .ingredient(savedIngredient)
                .build();
        // when
        Stock savedStock = stockRepository.save(stockToSave);

        // then
        assertThat(savedStock).isNotNull();
        assertThat(savedStock.getId()).isNotNull();
        assertThat(savedStock.getAmount()).isEqualTo(stockToSave.getAmount());
    }

    @Test
    public void givenStock_whenFindById_thenReturnStock(){
        // given
        Stock savedStock = stockRepository.save(stock);

        // when
        Stock foundStock = stockRepository.findById(savedStock.getId()).orElse(null);

        // then
        assertThat(foundStock).isNotNull();
        assertThat(foundStock.getId()).isEqualTo(savedStock.getId());
        assertThat(foundStock.getAmount()).isEqualTo(savedStock.getAmount());
    }

    @Test
    public void givenStock_whenDeleteById_thenDeleteStock(){
        // given
        Stock savedStock = stockRepository.save(stock);

        // when
        stockRepository.deleteById(savedStock.getId());

        // then
        Stock foundStock = stockRepository.findById(savedStock.getId()).orElse(null);
        assertThat(foundStock).isNull();
    }

    @Test
    public void givenStock_whenUpdate_thenUpdateStock(){
        // given
        Stock savedStock = stockRepository.save(stock);

        // when
        savedStock.setAmount(20.0);
        Stock updatedStock = stockRepository.save(savedStock);

        // then
        assertThat(updatedStock).isNotNull();
        assertThat(updatedStock.getId()).isEqualTo(savedStock.getId());
        assertThat(updatedStock.getAmount()).isEqualTo(savedStock.getAmount());
    }

    @Test
    public void givenStock_whenFindAll_thenReturnStockList(){
        // given
        Stock savedStock = stockRepository.save(stock);

        // when
        Iterable<Stock> stockList = stockRepository.findAll();

        // then
        assertThat(stockList).isNotNull();
        assertThat(stockList).asList().isNotEmpty();
    }

}
