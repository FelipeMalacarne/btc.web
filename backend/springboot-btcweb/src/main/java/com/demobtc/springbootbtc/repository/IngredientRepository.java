package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @Query("SELECT i " +
            "FROM Ingredient i " +
            "JOIN Stock s ON i.id = s.ingredient.id " +
            "WHERE s.amount < i.min OR s.amount > i.max")
    List<Ingredient> findIngredientsOutsideLimits();
}
