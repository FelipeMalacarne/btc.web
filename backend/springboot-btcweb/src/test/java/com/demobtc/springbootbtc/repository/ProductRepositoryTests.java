package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@Transactional
@RunWith(SpringRunner.class)
public class ProductRepositoryTests {

    @Autowired
    ProductRepository productRepository;

    Product product;

    @Before
    public void setup(){
        product = Product.builder()
                .name("TesteSetupProduct")
                .price(10.2)
                .description("Product created on testsetup")
                .isActive(true)
                .build();
    }

    @Test
    public void givenProductObject_whenSave_thenReturnSavedProduct(){
        // given
        Product productToSave = product;
        // when
        Product savedProduct = productRepository.save(productToSave);
        // then
        assertThat(savedProduct).isNotNull();
        assertThat(savedProduct.getId()).isNotNull();
        assertThat(savedProduct.getName()).isEqualTo(productToSave.getName());
        assertThat(savedProduct.getPrice()).isEqualTo(productToSave.getPrice());
        assertThat(savedProduct.getDescription()).isEqualTo(productToSave.getDescription());
    }
    @Test
    public void whenFindAll_thenReturnListOfProducts(){
        // given
        Product productToSave = product;
        Product savedProduct = productRepository.save(productToSave);
        // when
        List<Product> products = productRepository.findAll();
        // then
        assertThat(products).isNotNull();
        assertThat(products.size()).isGreaterThan(0);
    }
    @Test
    public void givenProductObject_whenFindById_thenReturnProduct(){
        // given
        Product productToSave = product;
        Product savedProduct = productRepository.save(productToSave);
        // when
        Product product = productRepository.findById(savedProduct.getId()).orElse(null);
        // then
        assertThat(product).isNotNull();
        assertThat(product.getId()).isEqualTo(savedProduct.getId());
        assertThat(product.getName()).isEqualTo(savedProduct.getName());
        assertThat(product.getPrice()).isEqualTo(savedProduct.getPrice());
        assertThat(product.getDescription()).isEqualTo(savedProduct.getDescription());
    }
    @Test
    public void givenProduct_whenUpdate_thenReturnsUpdatedProduct(){
        // given
        Product productToSave = product;
        Product savedProduct = productRepository.save(productToSave);
        // when
        savedProduct.setName("UpdatedName");
        savedProduct.setPrice(20.0);
        savedProduct.setDescription("UpdatedDescription");
        Product updatedProduct = productRepository.save(savedProduct);
        // then
        assertThat(updatedProduct).isNotNull();
        assertThat(updatedProduct.getId()).isEqualTo(savedProduct.getId());
        assertThat(updatedProduct.getName()).isEqualTo(savedProduct.getName());
        assertThat(updatedProduct.getPrice()).isEqualTo(savedProduct.getPrice());
        assertThat(updatedProduct.getDescription()).isEqualTo(savedProduct.getDescription());
    }
    @Test
    public void givenProduct_whenDelete_thenReturnsNull(){
        // given
        Product productToSave = product;
        Product savedProduct = productRepository.save(productToSave);
        // when
        productRepository.delete(savedProduct);
        Product product = productRepository.findById(savedProduct.getId()).orElse(null);
        // then
        assertThat(product).isNull();
    }

}
