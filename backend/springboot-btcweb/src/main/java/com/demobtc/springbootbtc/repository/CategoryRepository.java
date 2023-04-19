package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
