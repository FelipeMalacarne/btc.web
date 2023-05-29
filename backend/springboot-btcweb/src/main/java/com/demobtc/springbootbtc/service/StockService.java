package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.stock.EntryRequest;
import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.model.EntryIngredient;
import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.model.Stock;
import com.demobtc.springbootbtc.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    @Autowired
    StockRepository stockRepository;

    @Autowired
    EntryIngredientRepository entryIngredientRepository;

    @Autowired
    LeaveIngredientRepository leaveIngredientRepository;

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    AccountRepository accountRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock getStockById(Long id) {
        return stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found"));
    }

    public Stock createStock(Stock stock) {
        return stockRepository.save(stock);
    }


    public EntryIngredient registerEntry(EntryRequest entryRequest) {
        Ingredient foundIngredient = ingredientRepository.findById(entryRequest.getIngredientId())
                .orElseThrow(() -> new ResourceNotFoundException("Ingredient not found"));
        Account foundAccount = accountRepository.findById(entryRequest.getAccountId())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        // update stock if exists
        Stock foundStock = stockRepository.findByIngredientId(foundIngredient.getId());
        if (foundStock != null) {
            foundStock.setAmount(foundStock.getAmount() + entryRequest.getAmount());
            stockRepository.save(foundStock);
        } else {
            Stock stockToCreate = Stock.builder()
                    .amount(entryRequest.getAmount())
                    .ingredient(foundIngredient)
                    .build();
            stockRepository.save(stockToCreate);
        }

        EntryIngredient entryToCreate = EntryIngredient.builder()
                .amount(entryRequest.getAmount())
                .entryDate(entryRequest.getEntryDate())
                .expirationDate(entryRequest.getExpirationDate())
                .ingredient(foundIngredient)
                .account(foundAccount)
                .build();

        return entryIngredientRepository.save(entryToCreate);
    }
}
