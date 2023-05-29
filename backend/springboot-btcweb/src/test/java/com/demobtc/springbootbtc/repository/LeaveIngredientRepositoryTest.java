package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.LeaveIngredient;
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
public class LeaveIngredientRepositoryTest {

    @Autowired
    LeaveIngredientRepository leaveIngredientRepository;

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    AccountRepository accountRepository;

    LeaveIngredient leaveIngredient;

    @Before
    public void setup(){
        leaveIngredient = LeaveIngredient.builder()
                .ingredient(ingredientRepository.findById(1L).orElse(null))
                .account(accountRepository.findById(1L).orElse(null))
                .date(new Timestamp(System.currentTimeMillis()))
                .amount(100.0)
                .build();
    }

    @Test
    public void givenLeaveIngredient_whenSave_thenReturnSavedLeaveIngredient(){
        // given
        LeaveIngredient savedLeaveIngredient = leaveIngredient;
        // when
        LeaveIngredient foundLeaveIngredient = leaveIngredientRepository.save(savedLeaveIngredient);
        // then
        assertThat(foundLeaveIngredient).isEqualTo(savedLeaveIngredient);
    }

    @Test
    public void givenLeaveIngredient_whenFindById_thenReturnLeaveIngredient(){
        // given
        LeaveIngredient savedLeaveIngredient = leaveIngredientRepository.save(leaveIngredient);
        // when
        LeaveIngredient foundLeaveIngredient = leaveIngredientRepository.findById(savedLeaveIngredient.getId()).orElse(null);
        // then
        assertThat(foundLeaveIngredient).isEqualTo(savedLeaveIngredient);
    }

    @Test
    public void givenLeaveIngredient_whenDeleteById_thenLeaveIngredientShouldNotExist(){
        // given
        LeaveIngredient savedLeaveIngredient = leaveIngredientRepository.save(leaveIngredient);
        // when
        leaveIngredientRepository.deleteById(savedLeaveIngredient.getId());
        // then
        assertThat(leaveIngredientRepository.findById(savedLeaveIngredient.getId()).orElse(null)).isNull();
    }

    @Test
    public void givenLeaveIngredient_whenUpdate_thenReturnUpdatedLeaveIngredient(){
        // given
        LeaveIngredient savedLeaveIngredient = leaveIngredientRepository.save(leaveIngredient);
        // when
        savedLeaveIngredient.setAmount(200.0);
        LeaveIngredient updatedLeaveIngredient = leaveIngredientRepository.save(savedLeaveIngredient);
        // then
        assertThat(updatedLeaveIngredient.getAmount()).isEqualTo(200.0);
    }

    @Test
    public void givenLeaveIngredient_whenFindAll_thenReturnAllLeaveIngredients(){
        // given
        LeaveIngredient savedLeaveIngredient = leaveIngredientRepository.save(leaveIngredient);
        // when
        Iterable<LeaveIngredient> foundLeaveIngredients = leaveIngredientRepository.findAll();
        // then
        assertThat(foundLeaveIngredients).asList().contains(savedLeaveIngredient);
    }


}
