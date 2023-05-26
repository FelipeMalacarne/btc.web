package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.EntryIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryIngredientRepository extends JpaRepository<EntryIngredient, Long> {
}
