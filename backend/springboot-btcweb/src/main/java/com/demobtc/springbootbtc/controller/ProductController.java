package com.demobtc.springbootbtc.controller;

import com.demobtc.springbootbtc.dto.request.product.AddIngredientToProductRequest;
import com.demobtc.springbootbtc.dto.request.product.PostNewProductRequest;
import com.demobtc.springbootbtc.dto.request.product.UpdateProductRequest;
import com.demobtc.springbootbtc.dto.response.product.ProductErrorResponse;
import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.model.Product;
import com.demobtc.springbootbtc.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){
        try {
            List<Product> productList = productService.getAllProducts();
            return ResponseEntity.ok(productList);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Product>getProductById(@PathVariable(value = "id") Long id) {
        try{
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Product> createProduct(@RequestBody PostNewProductRequest request){
        try {
            Product createdProduct = productService.createProduct(request);
            return ResponseEntity.ok(createdProduct);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody UpdateProductRequest request, @PathVariable(value = "id") Long id){
        try{
            Product updatedProduct = productService.updateProduct(request, id);
            return ResponseEntity.ok(updatedProduct);
        } catch (ResourceNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?>  deleteProduct(@PathVariable(value = "id") Long id){
        try{
            Product deletedProduct = productService.deleteProduct(id);
            return ResponseEntity.ok(deletedProduct);
        } catch (ResourceNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/ingredients")
    public ResponseEntity<Product> addIngredientToProduct(
            @PathVariable(value = "id") Long productId,
            @RequestBody AddIngredientToProductRequest request) {
        try{
            Product updatedProduct = productService.addIngredientToProduct(
                    productId, request.getIngredient(), request.getAmount()
            );
            return ResponseEntity.ok(updatedProduct);
        } catch (ResourceNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
