package com.demobtc.springbootbtc.controller;



import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*", maxAge = 3600)
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


    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @PutMapping("/{id}")
    public Account updateAccount(@RequestBody Account account, @PathVariable(value = "id") Long id) {
        return accountService.updateAccount(account, id);
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable(value = "id") Long id) {
        accountService.deleteAccount(id);
    }

}
