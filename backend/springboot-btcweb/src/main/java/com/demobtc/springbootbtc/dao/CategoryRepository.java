package com.demobtc.springbootbtc.dao;

import com.demobtc.springbootbtc.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<ProductCategory, Long> {
}
