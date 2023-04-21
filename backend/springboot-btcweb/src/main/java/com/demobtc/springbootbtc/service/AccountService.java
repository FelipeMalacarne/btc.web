package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));

    }

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account updateAccount(Account account, Long id) {
        Account accountToUpdate = accountRepository.findById(id)
                                                  .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        accountToUpdate.setName(account.getName());
        accountToUpdate.setCpf(account.getCpf());
        accountToUpdate.setEmail(account.getEmail());
        accountToUpdate.setPassword(account.getPassword());
        accountToUpdate.setRoles(account.getRoles());
        return accountRepository.save(accountToUpdate);
    }

    public void deleteAccount(Long id) {
        Account accountToDelete = accountRepository.findById(id)
                                                  .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        accountRepository.delete(accountToDelete);
    }




}
