package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.sale.CreateSaleRequest;
import com.demobtc.springbootbtc.dto.request.sale.ProductListRequest;
import com.demobtc.springbootbtc.model.Product;
import com.demobtc.springbootbtc.model.Sale;
import com.demobtc.springbootbtc.model.SaleProduct;
import com.demobtc.springbootbtc.repository.SaleProductRepository;
import com.demobtc.springbootbtc.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class SaleService {

    @Autowired
    SaleRepository saleRepository;

    @Autowired
    SaleProductRepository saleProductRepository;

    @Autowired
    StockService stockService;

    @Autowired
    ProductService productService;

    @Autowired
    AccountService accountService;

    public List<Sale> findAll() {
        return saleRepository.findAll();
    }

    public Sale findById(Long id) {
        return saleRepository.findById(id).orElse(null);
    }

    public Sale createSale(CreateSaleRequest request) {
        Sale saleToCreate = new Sale();

        List<SaleProduct> saleProductSet = new ArrayList<>();

        Double total = 0.0;
        for (ProductListRequest item : request.getProductList()) {
            Product product = productService.getProductById(item.getProductId());
            stockService.withdrawProductIngredientsFromStock(product, item.getAmount());
            total += product.getPrice() * item.getAmount();
            SaleProduct saleProduct = SaleProduct.builder()
                    .product(product)
                    .sale(saleToCreate)
                    .amount(item.getAmount())
                    .build();
            saleProductSet.add(saleProduct);
        }

        saleToCreate.setAccount(accountService.getAccountById(request.getAccountId()));
        saleToCreate.setTotal(total);
        saleToCreate.setProductList(saleProductSet);
        saleToCreate.setTime(new Timestamp(System.currentTimeMillis()));
        return saleRepository.save(saleToCreate);

    }


}
