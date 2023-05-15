package com.demobtc.springbootbtc.dto.response.product;

import com.demobtc.springbootbtc.model.Product;
import lombok.Data;

public class ProductErrorResponse extends Product {

        private String message;

        public ProductErrorResponse(String message) {
            this.message = message;
        }
}
