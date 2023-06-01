package com.demobtc.springbootbtc.controller;

import com.demobtc.springbootbtc.dto.request.sale.CreateSaleRequest;
import com.demobtc.springbootbtc.dto.response.MessageResponse;
import com.demobtc.springbootbtc.model.Sale;
import com.demobtc.springbootbtc.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping
    public ResponseEntity<List<Sale>> getAllSales() {
        return ResponseEntity.ok(saleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSaleById(@PathVariable(value = "id") Long id) {
        try{
            Sale sale = saleService.findById(id);
            return ResponseEntity.ok(sale);

        } catch (ResourceNotFoundException e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().body(new MessageResponse(e.getMessage()));
        } catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createSale(@RequestBody CreateSaleRequest request) {
        try {
            Sale saleCreated = saleService.createSale(request);
            return ResponseEntity.ok(saleCreated);
        } catch (ResourceNotFoundException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().body(new MessageResponse(e.getMessage()));
        }
    }

}
