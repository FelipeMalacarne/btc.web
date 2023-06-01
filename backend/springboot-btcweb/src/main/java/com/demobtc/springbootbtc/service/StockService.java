package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.stock.EntryRequest;
import com.demobtc.springbootbtc.dto.request.stock.LeaveRequest;
import com.demobtc.springbootbtc.dto.response.StockMovement;
import com.demobtc.springbootbtc.model.*;
import com.demobtc.springbootbtc.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

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
                .date(entryRequest.getEntryDate())
                .expirationDate(entryRequest.getExpirationDate())
                .ingredient(foundIngredient)
                .account(foundAccount)
                .build();

        return entryIngredientRepository.save(entryToCreate);
    }

    public LeaveIngredient registerLeave(LeaveRequest request){
        Ingredient foundIngredient = ingredientRepository.findById(request.getIngredientId())
                .orElseThrow(() -> new ResourceNotFoundException("Ingredient not found"));
        Account foundAccount = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        // update stock if exists
        Stock foundStock = stockRepository.findByIngredientId(foundIngredient.getId());
        if (foundStock != null) {
            foundStock.setAmount(foundStock.getAmount() - request.getAmount());
            stockRepository.save(foundStock);
        } else {
            throw new ResourceNotFoundException("Stock not found");
        }

        LeaveIngredient leaveToCreate = LeaveIngredient.builder()
                .amount(request.getAmount())
                .date(request.getLeaveDate())
                .ingredient(foundIngredient)
                .account(foundAccount)
                .build();

        return leaveIngredientRepository.save(leaveToCreate);
    }

    public List<EntryIngredient> getAllEntries() {
        return entryIngredientRepository.findAll();
    }

    public List<LeaveIngredient> getAllLeaves() {
        return leaveIngredientRepository.findAll();
    }

    public List<StockMovement> getStockMovement(){
        List<StockMovement> stockMovement = new ArrayList<>();
        List<EntryIngredient> entryList = getAllEntries();
        List<LeaveIngredient> leaveList = getAllLeaves();

        AtomicLong idGenerator = new AtomicLong(1);

        for (EntryIngredient entry : entryList) {
            StockMovement stock = StockMovement.builder()
                    .id(idGenerator.getAndIncrement())
                    .accountName(entry.getAccount().getName())
                    .ingredient(entry.getIngredient())
                    .amount(entry.getAmount())
                    .date(entry.getDate())
                    .type("Deposit")
                    .build();
            stockMovement.add(stock);
        }
        for (LeaveIngredient leave : leaveList) {
            StockMovement stock = StockMovement.builder()
                    .id(idGenerator.getAndIncrement())
                    .accountName(leave.getAccount().getName())
                    .ingredient(leave.getIngredient())
                    .amount(leave.getAmount())
                    .date(leave.getDate())
                    .type("Withdraw")
                    .build();
            stockMovement.add(stock);
        }
        stockMovement.sort(Comparator.comparing(StockMovement::getDate));

        return stockMovement;
    }

    // withdraw the amount of ingredient in the product from stock
    public void withdrawProductIngredientsFromStock(Product product) {
        List<ProductIngredient> ingredientList = product.getIngredientList();
        for (ProductIngredient productIngredient : ingredientList) {
            Stock stock = stockRepository.findByIngredientId(productIngredient.getProduct().getId());
            stock.setAmount(stock.getAmount() - productIngredient.getAmount());
            stockRepository.save(stock);
        }
    }
}
