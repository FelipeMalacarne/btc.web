package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Sale;
import com.demobtc.springbootbtc.model.SaleProduct;
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
public class SaleProductRepositoryTests {

    @Autowired
    SaleProductRepository saleProductRepository;

    @Autowired
    SaleRepository saleRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    AccountRepository accountRepository;

    SaleProduct saleProduct;
    Sale sale;

    @Before
    public void setup(){
        sale = Sale.builder()
                .account(accountRepository.findById(1L).orElse(null))
                .time(new Timestamp(System.currentTimeMillis()))
                .total(150.0)
                .productList(new ArrayList<>())
                .build();
        sale = saleRepository.save(sale);

        saleProduct = SaleProduct.builder()
                .amount(2)
                .sale(sale)
                .product(productRepository.findById(1L).orElse(null))
                .build();
    }

    @Test
    public void givenSaleProduct_whenSave_thenReturnSavedSaleProduct() {
        // given
        SaleProduct givenSaleProduct = saleProduct;
        // when
        SaleProduct savedSaleProduct = saleProductRepository.save(givenSaleProduct);
        // then
        assertThat(savedSaleProduct).isEqualTo(givenSaleProduct);
    }
    @Test
    public void givenSaleProduct_whenFindById_thenReturnSaleProduct() {
        // given
        SaleProduct givenSaleProduct = saleProductRepository.save(saleProduct);
        // when
        SaleProduct foundSaleProduct = saleProductRepository.findById(givenSaleProduct.getId()).orElse(null);
        // then
        assertThat(foundSaleProduct).isEqualTo(givenSaleProduct);
    }

    @Test
    public void givenSaleProduct_whenDelete_thenSaleProductShouldNotExist() {
        // given
        SaleProduct givenSaleProduct = saleProductRepository.save(saleProduct);
        // when
        saleProductRepository.delete(givenSaleProduct);
        // then
        assertThat(saleProductRepository.findById(givenSaleProduct.getId())).isEmpty();
    }

    @Test
    public void givenSaleProduct_whenUpdate_thenReturnUpdatedSaleProduct() {
        // given
        SaleProduct givenSaleProduct = saleProductRepository.save(saleProduct);
        // when
        givenSaleProduct.setAmount(3);
        SaleProduct updatedSaleProduct = saleProductRepository.save(givenSaleProduct);
        // then
        assertThat(updatedSaleProduct.getAmount()).isEqualTo(3);
    }


}
