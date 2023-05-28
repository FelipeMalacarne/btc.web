package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.model.Stock;
import com.demobtc.springbootbtc.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    @Autowired
    StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }
}
