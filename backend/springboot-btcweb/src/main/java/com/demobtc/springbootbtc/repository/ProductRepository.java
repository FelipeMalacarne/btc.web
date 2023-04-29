package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;


public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContaining(@RequestParam("name") String title, Pageable pageable);
//    Page<Product> findByCategory(@RequestParam("category") String category, Pageable pageable);
}
