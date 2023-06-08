package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Ingredient;
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
public class IngredientRepositoryTests {

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    UnitRepository unitRepository;

    Ingredient ingredient;

    @Before
    public void setup() {
        ingredient = Ingredient.builder()
                .name("TesteSetup")
                .min(200.0)
                .max(300.0)
                .unitOfMeasure(unitRepository.findById(1L).orElse(null))
                .build();
    }

    @Test
    public void givenIngredientObject_whenSave_thenReturnSavedIngredient(){
        // given
        Ingredient ingredientToSave = Ingredient.builder()
                                    .name("Teste")
                                    .min(500.0)
                                    .max(900.0)
                                    .unitOfMeasure(unitRepository.findById(1L).orElse(null))
                                    .build();
        // when
        Ingredient savedIngredient = ingredientRepository.save(ingredientToSave);
        // then
        assertThat(savedIngredient).isNotNull();
        assertThat(savedIngredient.getId()).isNotNull();
        assertThat(savedIngredient.getName()).isEqualTo(ingredientToSave.getName());
    }

    @Test
    public void givenIngredient_whenFindById_thenReturnIngredient(){
        // given
        Ingredient savedIngredient = ingredientRepository.save(ingredient);

        // when
        Ingredient foundIngredient = ingredientRepository.findById(savedIngredient.getId()).orElse(null);

        // then
        assertThat(foundIngredient).isNotNull();
        assertThat(foundIngredient.getId()).isEqualTo(savedIngredient.getId());
        assertThat(foundIngredient.getName()).isEqualTo(savedIngredient.getName());
        assertThat(foundIngredient.getMin()).isEqualTo(savedIngredient.getMin());
        assertThat(foundIngredient.getMax()).isEqualTo(savedIngredient.getMax());

    }

    @Test
    public void givenIngredient_whenUpdate_thenIngredientIsUpdated(){
        // given
        Ingredient savedIngredient = ingredientRepository.save(ingredient);
        Ingredient ingredientToUpdate = Ingredient.builder()
                .id(savedIngredient.getId())
                .name("TesteUpdate")
                .unitOfMeasure(unitRepository.findById(1L).orElse(null))
                .min(100.0)
                .max(200.0)
                .build();

        // when
        Ingredient updatedIngredient = ingredientRepository.save(ingredientToUpdate);

        // then
        assertThat(updatedIngredient).isNotNull();
        assertThat(updatedIngredient.getId()).isEqualTo(savedIngredient.getId());
        assertThat(updatedIngredient.getName()).isEqualTo(ingredientToUpdate.getName());
        assertThat(updatedIngredient.getMin()).isEqualTo(ingredientToUpdate.getMin());
        assertThat(updatedIngredient.getMax()).isEqualTo(ingredientToUpdate.getMax());
    }

    @Test
    public void givenIngredient_whenDelete_thenIngredientIsDeleted(){
        // given
        Ingredient savedIngredient = ingredientRepository.save(ingredient);

        // when
        ingredientRepository.delete(savedIngredient);

        // then
        Ingredient foundIngredient = ingredientRepository.findById(savedIngredient.getId()).orElse(null);
        assertThat(foundIngredient).isNull();
    }

}
