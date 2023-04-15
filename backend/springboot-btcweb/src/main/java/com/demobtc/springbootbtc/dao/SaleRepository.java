package com.demobtc.springbootbtc.dao;

import com.demobtc.springbootbtc.models.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}
