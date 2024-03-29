package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.EntryIngredient;
import com.demobtc.springbootbtc.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
}
