package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.model.Product;
import com.demobtc.springbootbtc.model.ProductIngredient;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class ProductIngredientRepositoryTests {

    @Autowired
    ProductIngredientRepository productIngredientRepository;

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UnitRepository unitRepository;

    ProductIngredient productIngredient;
    Product product;
    Ingredient ingredient;
    @Before
    public void setup(){
         product = Product.builder()
                .name("TesteSetupProduct")
                .price(10.2)
                .description("Product created on testsetup")
                .build();

         ingredient = Ingredient.builder()
                .name("TesteSetupIngredient")
                .unitOfMeasure(unitRepository.findById(1L).orElse(null))
                .build();

        productIngredient = ProductIngredient.builder()
                .ingredient(ingredient)
                .amount(15.0)
                .product(product)
                .build();
    }

    @Test
    public void givenProductIngredientObject_whenSave_thenReturnSavedProductIngredient(){
        // given
        Ingredient savedIngredient = ingredientRepository.save(ingredient);
        Product savedProduct = productRepository.save(product);

        // when
        ProductIngredient savedProductIngredient = productIngredientRepository.save(productIngredient);

        // then
        assertThat(savedProductIngredient).isNotNull();
        assertThat(savedProductIngredient.getId()).isNotNull();
        assertThat(savedProductIngredient.getIngredient()).isEqualTo(savedProductIngredient.getIngredient());

    }

    @Test
    public void givenProductIngredient_whenFindById_thenReturnProductIngredient(){
        // given
        Ingredient savedIngredient = ingredientRepository.save(ingredient);
        Product savedProduct = productRepository.save(product);
        ProductIngredient savedProductIngredient = productIngredientRepository.save(productIngredient);

        // when
        ProductIngredient foundProductIngredient = productIngredientRepository.findById(savedProductIngredient.getId())
                                                                                .orElse(null);

        // then
        assertThat(foundProductIngredient).isNotNull();
        assertThat(foundProductIngredient.getId()).isEqualTo(savedProductIngredient.getId());
    }

    @Test
    public void givenProductIngredient_whenUpdate_thenReturnUpdatedProductIngredient(){
        // given
        Ingredient savedIngredient = ingredientRepository.save(ingredient);
        Product savedProduct = productRepository.save(product);
        ProductIngredient savedProductIngredient = productIngredientRepository.save(productIngredient);

        // when
        savedProductIngredient.setAmount(20.0);
        ProductIngredient updatedProductIngredient = productIngredientRepository.save(savedProductIngredient);

        // then
        assertThat(updatedProductIngredient).isNotNull();
        assertThat(updatedProductIngredient.getId()).isEqualTo(savedProductIngredient.getId());
        assertThat(updatedProductIngredient.getAmount()).isEqualTo(20.0);
    }

    @Test
    public void givenProductIngredient_whenDelete_thenProductIngredientShouldNotExist(){
        // given
        Ingredient savedIngredient = ingredientRepository.save(ingredient);
        Product savedProduct = productRepository.save(product);
        ProductIngredient savedProductIngredient = productIngredientRepository.save(productIngredient);
        // when
        productIngredientRepository.delete(savedProductIngredient);
        // then
        ProductIngredient foundProductIngredient = productIngredientRepository.findById(savedProductIngredient.getId())
                                                                                .orElse(null);
        assertThat(foundProductIngredient).isNull();
    }



}
