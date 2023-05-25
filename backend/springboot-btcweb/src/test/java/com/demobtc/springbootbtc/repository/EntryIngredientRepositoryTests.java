package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.EntryIngredient;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class EntryIngredientRepositoryTests {

    @Autowired
    EntryIngredientRepository entryIngredientRepository;

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    AccountRepository accountRepository;

    EntryIngredient entryIngredient;

    @Before
    public void setup() {
        entryIngredient = EntryIngredient.builder()
                .ingredient(ingredientRepository.findById(1L).orElse(null))
                .account(accountRepository.findById(1L).orElse(null))
                .entryDate(new Timestamp(System.currentTimeMillis()))
                .expirationDate(new Timestamp(System.currentTimeMillis() + 2592000000L))
                .amount(100.0)
                .build();
    }

    @Test
    public void givenEntryIngredient_whenSave_thenReturnSavedEntryIngredient(){
        // given
        EntryIngredient savedEntryIngredient = entryIngredient;
        // when
        EntryIngredient foundEntryIngredient = entryIngredientRepository.save(savedEntryIngredient);
        // then
        assertThat(foundEntryIngredient).isEqualTo(savedEntryIngredient);

    }

    @Test
    public void givenEntryIngredient_whenFindById_thenReturnEntryIngredient(){
        // given
        EntryIngredient savedEntryIngredient = entryIngredientRepository.save(entryIngredient);
        // when
        EntryIngredient foundEntryIngredient = entryIngredientRepository.findById(savedEntryIngredient.getId()).orElse(null);
        // then
        assertThat(foundEntryIngredient).isEqualTo(savedEntryIngredient);
    }

    @Test
    public void givenEntryIngredient_whenDelete_thenEntryIngredientShouldNotExist(){
        // given
        EntryIngredient savedEntryIngredient = entryIngredientRepository.save(entryIngredient);
        // when
        entryIngredientRepository.delete(savedEntryIngredient);
        // then
        assertThat(entryIngredientRepository.findById(savedEntryIngredient.getId()).orElse(null)).isNull();
    }

    @Test
    public void givenEntryIngredient_whenUpdate_thenReturnUpdatedEntryIngredient(){
        // given
        EntryIngredient savedEntryIngredient = entryIngredientRepository.save(entryIngredient);
        // when
        savedEntryIngredient.setAmount(200.0);
        EntryIngredient updatedEntryIngredient = entryIngredientRepository.save(savedEntryIngredient);
        // then
        assertThat(updatedEntryIngredient).isEqualTo(savedEntryIngredient);
    }

    @Test
    public void givenEntryIngredient_whenFindAll_thenReturnListOfEntryIngredients(){
        // given
        EntryIngredient savedEntryIngredient = entryIngredientRepository.save(entryIngredient);
        // when
        Iterable<EntryIngredient> foundEntryIngredients = entryIngredientRepository.findAll();
        // then
        assertThat(foundEntryIngredients).asList().contains(savedEntryIngredient);
    }

}
