package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.EntryIngredient;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SaleRepository extends JpaRepository<EntryIngredient, Long> {
}
