package com.demobtc.springbootbtc.dao;

import com.demobtc.springbootbtc.models.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
