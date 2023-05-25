package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.product.CategoryToProductRequest;
import com.demobtc.springbootbtc.dto.request.product.IngredientToProductRequest;
import com.demobtc.springbootbtc.dto.request.product.PostNewProductRequest;
import com.demobtc.springbootbtc.dto.request.product.ProductRequest;
import com.demobtc.springbootbtc.model.Category;
import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.model.Product;
import com.demobtc.springbootbtc.model.ProductIngredient;
import com.demobtc.springbootbtc.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private ProductIngredientService productIngredientService;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public Product createProduct(ProductRequest request) {
        Product productToCreate = new Product();

        productToCreate.setName(request.getName());
        if (request.getDescription() != null) {
            productToCreate.setDescription(request.getDescription());
        }
        if (request.getCategorySet() != null) {
            Set<Category> categorySet = new HashSet<>();
            for (CategoryToProductRequest categoryToProductRequest : request.getCategorySet()) {
                Long categoryId = categoryToProductRequest.getCategoryId();
                Category category = categoryService.getCategoryById(categoryId);
                categorySet.add(category);
            }
            productToCreate.setCategorySet(categorySet);
        }
        if (request.getIngredientList() != null) {
            List<ProductIngredient> productIngredientList = new ArrayList<>();
            for (IngredientToProductRequest ingredientToProductRequest : request.getIngredientList()) {
                Long ingredientId = ingredientToProductRequest.getIngredientId();
                Ingredient ingredient = ingredientService.getIngredientById(ingredientId);
                ProductIngredient productIngredient = new ProductIngredient();
                productIngredient.setIngredient(ingredient);
                productIngredient.setProduct(productToCreate);
                productIngredient.setAmount(ingredientToProductRequest.getAmount());
                productIngredientList.add(productIngredient);
            }
            productToCreate.setIngredientList(productIngredientList);
        }
        productToCreate.setPrice(request.getPrice());
        productToCreate.setActive(request.isActive());

        return productRepository.save(productToCreate);
    }

    public Product updateProduct(ProductRequest request, Long id) {
        Product productToUpdate = getProductById(id);

        System.out.println(productToUpdate);
        System.out.println(request);


        if (request.getName() != null) {
            productToUpdate.setName(request.getName());
        }
        if (request.getDescription() != null) {
            productToUpdate.setDescription(request.getDescription());
        }
        if (request.getPrice() != null) {
            productToUpdate.setPrice(request.getPrice());
        }
        if (request.getCategorySet() != null) {
            updateProductCategorySet(id, request.getCategorySet());
        }
        if (request.getIngredientList() != null) {
            System.out.println(request.getIngredientList());
            updateProductIngredientList(id, request.getIngredientList());
        }
        productToUpdate.setActive(request.isActive());

        productRepository.save(productToUpdate);
        return getProductById(id);
    }

    public Product deleteProduct(Long id) {
        Product productToDelete = getProductById(id);
        productRepository.delete(productToDelete);
        return productToDelete;
    }


    public Product addIngredientToProduct(Long productId, IngredientToProductRequest request) {
        Product existingProduct = getProductById(productId);

        List<ProductIngredient> ingredientList = existingProduct.getIngredientList();
        ProductIngredient productIngredient = new ProductIngredient();

        Ingredient ingredient = ingredientService.getIngredientById(request.getIngredientId());
        Double amount = request.getAmount();

        productIngredient.setIngredient(ingredient);
        productIngredient.setAmount(amount);
        productIngredient.setProduct(existingProduct);

        ingredientList.add(productIngredient);
        existingProduct.setIngredientList(ingredientList);

        return productRepository.save(existingProduct);

    }

    @Transactional
    public Product updateProductIngredientList(Long productId, List<IngredientToProductRequest> request) {
        Product productToUpdate = getProductById(productId);

        List<ProductIngredient> productIngredientList = new ArrayList<>();

        for (IngredientToProductRequest ingredientToProductRequest : request) {
            ProductIngredient productIngredient = new ProductIngredient();

            Ingredient ingredient = ingredientService.getIngredientById(ingredientToProductRequest.getIngredientId());
            Double amount = ingredientToProductRequest.getAmount();

            productIngredient.setIngredient(ingredient);
            productIngredient.setAmount(amount);
            productIngredient.setProduct(productToUpdate);

            productIngredientList.add(productIngredient);
        }


        productToUpdate.getIngredientList().clear();
        productToUpdate.getIngredientList().addAll(productIngredientList);


        return productRepository.save(productToUpdate);
    }

    public Product updateProductCategorySet(Long productId, Set<CategoryToProductRequest> request) {
        Product productToUpdate = getProductById(productId);
        Set<Category> categorySet = new HashSet<>();

        for (CategoryToProductRequest categoryToProductRequest : request) {
            Long categoryId = categoryToProductRequest.getCategoryId();
            Category category = categoryService.getCategoryById(categoryId);
            categorySet.add(category);
        }
        productToUpdate.getCategorySet().clear();
        productToUpdate.getCategorySet().addAll(categorySet);

        return productRepository.save(productToUpdate);
    }


}
