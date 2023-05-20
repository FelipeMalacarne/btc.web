package com.demobtc.springbootbtc.controller;

import com.demobtc.springbootbtc.dto.request.product.CategoryToProductRequest;
import com.demobtc.springbootbtc.dto.request.product.IngredientToProductRequest;
import com.demobtc.springbootbtc.dto.request.product.ProductRequest;
import com.demobtc.springbootbtc.model.Product;
import com.demobtc.springbootbtc.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request){
        try {
            Product createdProduct = productService.createProduct(request);
            return ResponseEntity.ok(createdProduct);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody ProductRequest request,
                                                 @PathVariable(value = "id") Long id){
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
    public ResponseEntity<Product> updateProductIngredientList(@PathVariable(value = "id") Long productId,
                                                               @RequestBody List<IngredientToProductRequest> request){
        try{
            Product updatedProduct = productService.updateProductIngredientList(productId, request);
            return ResponseEntity.ok(updatedProduct);
        } catch (ResourceNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PutMapping("/{id}/categories")
    public ResponseEntity<Product> updateProductCategorySet(@PathVariable(value = "id") Long productId,
                                                            @RequestBody Set<CategoryToProductRequest> request){
        try{
            Product updatedProduct = productService.updateProductCategorySet(productId, request);
            return ResponseEntity.ok(updatedProduct);
        } catch (ResourceNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
