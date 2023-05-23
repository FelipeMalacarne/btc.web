package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Unit;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UnitRepositoryTest {

    @Autowired
    UnitRepository unitRepository;

    private Unit unit;

    @Before
    public void setup() {
        unit = Unit.builder()
                .name("TesteSetup")
                .symbol("TS")
                .build();
    }

    @Test
    public void givenUnitObject_whenSave_thenReturnSavedUnit(){
        // given
        Unit unitToSave = Unit.builder()
                .name("Teste")
                .symbol("T")
                .build();

        // when
        Unit savedUnit = unitRepository.save(unitToSave);

        // then
        assertThat(savedUnit).isNotNull();
        assertThat(savedUnit.getId()).isNotNull();
        assertThat(savedUnit.getName()).isEqualTo(unitToSave.getName());
    }

    @Test
    public void givenUnitObject_whenFindById_thenReturnUnit(){
        // given
        Unit unitToSave = Unit.builder()
                .name("Teste")
                .symbol("T")
                .build();

        // when
        Unit savedUnit = unitRepository.save(unitToSave);
        Unit foundUnit = unitRepository.findById(savedUnit.getId()).orElse(null);

        // then
        assertThat(foundUnit).isNotNull();
        assertThat(foundUnit.getId()).isNotNull();
        assertThat(foundUnit.getName()).isEqualTo(unitToSave.getName());
    }

    @Test
    public void givenUnitObject_whenUpdate_thenReturnUpdatedUnit(){
        // given
        Unit savedUnit = unitRepository.save(unit);
        savedUnit.setName("TesteUpdate");

        // when
        Unit updatedUnit = unitRepository.save(savedUnit);

        // then
        assertThat(updatedUnit).isNotNull();
        assertThat(updatedUnit.getId()).isNotNull();
        assertThat(updatedUnit.getName()).isEqualTo(savedUnit.getName());
    }

    @Test
    public void givenUnitObject_whenDelete_thenUnitShouldNotBeFound(){
        // given
        Unit savedUnit = unitRepository.save(unit);

        // when
        unitRepository.delete(savedUnit);
        Unit foundUnit = unitRepository.findById(savedUnit.getId()).orElse(null);

        // then
        assertThat(foundUnit).isNull();
    }
}
