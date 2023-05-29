package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.LeaveIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveIngredientRepository extends JpaRepository<LeaveIngredient, Long> {
}
