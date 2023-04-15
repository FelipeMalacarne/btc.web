package com.demobtc.springbootbtc.dao;

import com.demobtc.springbootbtc.models.ProductIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductIngredientRepository extends JpaRepository<ProductIngredient, Long> {
}
