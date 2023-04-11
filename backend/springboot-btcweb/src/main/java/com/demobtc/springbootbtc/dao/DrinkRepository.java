package com.demobtc.springbootbtc.dao;

import com.demobtc.springbootbtc.entity.Drink;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;


public interface DrinkRepository extends JpaRepository<Drink, Long> {
    Page<Drink> findByNameContaining(@RequestParam("name") String title, Pageable pageable);
    Page<Drink> findByCategory(@RequestParam("category") String category, Pageable pageable);
}
