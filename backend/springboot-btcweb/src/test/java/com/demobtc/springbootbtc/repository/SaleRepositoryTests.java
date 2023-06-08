package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Sale;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class SaleRepositoryTests {

    @Autowired
    SaleRepository salesRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    SaleProductRepository saleProductRepository;

    Sale sale;

    @Before
    public void setUp() {
        sale = Sale.builder()
                .account(accountRepository.findById(1L).orElse(null))
                .time(new Timestamp(System.currentTimeMillis()))
                .total(150.0)
                .productList(new ArrayList<>())
                .build();
    }

    @Test
    public void givenSale_whenSave_thenReturnSavedSale() {
        // given
        Sale givenSale = sale;
        // when
        Sale savedSale = salesRepository.save(givenSale);
        // then
        assertThat(savedSale).isEqualTo(givenSale);
    }

    @Test
    public void givenSale_whenFindById_thenReturnSale() {
        // given
        Sale givenSale = salesRepository.save(sale);
        // when
        Sale foundSale = salesRepository.findById(givenSale.getId()).orElse(null);
        // then
        assertThat(foundSale).isEqualTo(givenSale);
    }

    @Test
    public void givenSale_whenDelete_thenSaleShouldNotExist() {
        // given
        Sale givenSale = salesRepository.save(sale);
        // when
        salesRepository.delete(givenSale);
        // then
        assertThat(salesRepository.findById(givenSale.getId()).orElse(null)).isNull();
    }

    @Test
    public void givenSale_whenUpdate_thenReturnUpdatedSale() {
        // given
        Sale givenSale = salesRepository.save(sale);
        // when
        givenSale.setTotal(200.0);
        Sale updatedSale = salesRepository.save(givenSale);
        // then
        assertThat(updatedSale).isEqualTo(givenSale);
    }



}
