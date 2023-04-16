package com.demobtc.springbootbtc.dao;

import com.demobtc.springbootbtc.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
