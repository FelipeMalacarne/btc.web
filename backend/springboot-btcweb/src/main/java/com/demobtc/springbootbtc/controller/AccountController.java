package com.demobtc.springbootbtc.controller;



import com.demobtc.springbootbtc.dto.request.PostNewAccountRequest;
import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @PostMapping
    public Account createAccount(@RequestBody PostNewAccountRequest account) {
        return accountService.createAccount(account);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@RequestBody Account account, @PathVariable(value = "id") Long id) {
        try{
            Account updatedAccount = accountService.updateAccount(account, id);
            return ResponseEntity.ok(updatedAccount);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Account> deleteAccount(@PathVariable(value = "id") Long id) {
        try{
            Account deletedAccount = accountService.deleteAccount(id);
            return ResponseEntity.ok(deletedAccount);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
