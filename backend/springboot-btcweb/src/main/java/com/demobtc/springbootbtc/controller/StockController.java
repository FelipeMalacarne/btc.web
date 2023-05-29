package com.demobtc.springbootbtc.controller;

import com.demobtc.springbootbtc.dto.request.stock.EntryRequest;
import com.demobtc.springbootbtc.dto.request.stock.LeaveRequest;
import com.demobtc.springbootbtc.dto.response.MessageResponse;
import com.demobtc.springbootbtc.model.EntryIngredient;
import com.demobtc.springbootbtc.model.Stock;
import com.demobtc.springbootbtc.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        try {
            List<Stock> stockList = stockService.getAllStocks();
            return ResponseEntity.ok(stockList);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> depositStock(@RequestBody EntryRequest request) {
        try {
            EntryIngredient entryCreated = stockService.registerEntry(request);
            return ResponseEntity.ok(entryCreated);
        } catch (ResourceNotFoundException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Object> leaveStock(@RequestBody LeaveRequest request){
        try {
            stockService.registerLeave(request);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().body(new MessageResponse(e.getMessage()));
        }
    }

}
