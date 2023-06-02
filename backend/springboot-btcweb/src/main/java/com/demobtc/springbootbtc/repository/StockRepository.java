package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    Stock findByIngredientId(Long ingredientId);
}
