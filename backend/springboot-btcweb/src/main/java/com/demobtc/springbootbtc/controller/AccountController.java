package com.demobtc.springbootbtc.controller;



import com.demobtc.springbootbtc.dto.request.PostNewAccountRequest;
import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Account getAccountById(@PathVariable(value = "id") Long id) {
        return accountService.getAccountById(id);
    }


    @PreAuthorize("hasRole('MODERATOR')")
    @PostMapping
    public Account createAccount(@RequestBody PostNewAccountRequest account) {
        return accountService.createAccount(account);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Account updateAccount(@RequestBody Account account, @PathVariable(value = "id") Long id) {
        return accountService.updateAccount(account, id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable(value = "id") Long id) {
        accountService.deleteAccount(id);
    }

}
