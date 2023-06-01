package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.model.SaleProduct;
import com.demobtc.springbootbtc.repository.SaleProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleProductService {

    @Autowired
    SaleProductRepository saleProductRepository;

    List<SaleProduct> getAllSaleProducts() {
        return saleProductRepository.findAll();
    }

    SaleProduct getSaleProductById(Long id) {
        return saleProductRepository.findById(id).orElse(null);
    }

    SaleProduct createSaleProduct(SaleProduct saleProduct) {
        return saleProductRepository.save(saleProduct);
    }

    SaleProduct updateSaleProduct(SaleProduct saleProduct) {

        return saleProductRepository.save(saleProduct);
    }

    void deleteSaleProduct(SaleProduct saleProduct) {
        saleProductRepository.delete(saleProduct);
    }

    void deleteSaleProductById(Long id) {
        saleProductRepository.deleteById(id);
    }
}
