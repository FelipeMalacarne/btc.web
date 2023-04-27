package com.demobtc.springbootbtc.controller;

import com.demobtc.springbootbtc.dto.request.PostNewProductRequest;
import com.demobtc.springbootbtc.model.Product;
import com.demobtc.springbootbtc.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable(value = "id") Long id) {
        return productService.getProductById(id);
    }

    @PreAuthorize("hasRole('MODERATOR')")
    @PostMapping
    public Product createProduct(@RequestBody PostNewProductRequest request){
        return productService.createProduct(request);
    }

    @PreAuthorize("hasRole('MODERATOR')")
    @PutMapping("/{id}")
    public Product updateProduct(@RequestBody Product product, @PathVariable(value = "id") Long id){
        return productService.updateProduct(product, id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public Product deleteProduct(@PathVariable(value = "id") Long id){
        return productService.deleteProduct(id);
    }

}
