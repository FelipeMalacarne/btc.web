package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.ProductIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductIngredientRepository extends JpaRepository<ProductIngredient, Long> {
}
