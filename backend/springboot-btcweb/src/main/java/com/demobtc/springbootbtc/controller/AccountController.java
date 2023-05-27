package com.demobtc.springbootbtc.controller;



import com.demobtc.springbootbtc.dto.request.account.UpdateAccountRequest;
import com.demobtc.springbootbtc.dto.request.account.PostNewAccountRequest;
import com.demobtc.springbootbtc.dto.response.MessageResponse;
import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable(value = "id") Long id) {
        try{
            Account account = accountService.getAccountById(id);
            return ResponseEntity.ok().body(account);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }


    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody PostNewAccountRequest request) {
        try {
            Account createdAccount = accountService.createAccount(request);
            return ResponseEntity.ok(createdAccount);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateAccount(@RequestBody UpdateAccountRequest request, @PathVariable(value = "id") Long id) {
        try{
            Account updatedAccount = accountService.updateAccount(request, id);
            return ResponseEntity.ok(updatedAccount);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable(value = "id") Long id) {
        try{
            Account deletedAccount = accountService.deleteAccount(id);
            return ResponseEntity.ok(deletedAccount);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

}
