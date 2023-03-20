package com.demobtc.springbootbtc.dao;

import com.demobtc.springbootbtc.entity.Drink;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DrinkRepository extends JpaRepository<Drink, Long> {
}
