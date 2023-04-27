package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.PostNewAccountRequest;
import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    PasswordEncoder encoder;

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));

    }

    public Account createAccount(PostNewAccountRequest request) {
        Account accountToCreate = new Account();
        accountToCreate.setName(request.getUsername());
        accountToCreate.setCpf(request.getCpf());
        accountToCreate.setEmail(request.getEmail());
        accountToCreate.setPassword(encoder.encode(request.getPassword()));
        accountToCreate.setRoles(request.getRoles());

        return accountRepository.save(accountToCreate);
    }

    public Account updateAccount(Account account, Long id) {
        Account accountToUpdate = getAccountById(id);
        accountToUpdate.setName(account.getName());
        accountToUpdate.setCpf(account.getCpf());
        accountToUpdate.setEmail(account.getEmail());

        accountToUpdate.setPassword(encoder.encode(account.getPassword()));
        accountToUpdate.setRoles(account.getRoles());
        return accountRepository.save(accountToUpdate);
    }

    public Account deleteAccount(Long id) {
        Account accountToDelete = getAccountById(id);
        accountRepository.delete(accountToDelete);
        return accountToDelete;
    }




}
