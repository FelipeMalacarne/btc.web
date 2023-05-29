package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.dto.request.account.RoleSetRequest;
import com.demobtc.springbootbtc.dto.request.account.UpdateAccountRequest;
import com.demobtc.springbootbtc.dto.request.account.PostNewAccountRequest;
import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.model.Role;
import com.demobtc.springbootbtc.repository.AccountRepository;
import com.demobtc.springbootbtc.repository.RoleRepository;
import org.aspectj.weaver.patterns.HasThisTypePatternTriedToSneakInSomeGenericOrParameterizedTypePatternMatchingStuffAnywhereVisitor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));

    }
    public Account createAccount(PostNewAccountRequest request){
        Account accountToCreate = new Account();


        if (accountRepository.existsByName(request.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }
        if (accountRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        if (accountRepository.existsByCpf(request.getCpf())) {
            throw new RuntimeException("Error: CPF is already in use!");
        }

        accountToCreate.setName(request.getUsername());
        accountToCreate.setCpf(request.getCpf());
        accountToCreate.setEmail(request.getEmail());
        accountToCreate.setPassword(encoder.encode(request.getPassword()));

        accountToCreate.setRoles(new HashSet<>());
        Set<RoleSetRequest> requestRoles = request.getRoles();
        requestRoles.forEach(roleSetRequest -> {
            accountToCreate.getRoles().add(roleRepository.findById(roleSetRequest.getRoleId())
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found.")));
        });

        return accountRepository.save(accountToCreate);
    }

    public Account updateAccount(UpdateAccountRequest request, Long id) {
        // only update if values are not null
        Account accountToUpdate = getAccountById(id);

        if (request.getName() != null) {
            accountToUpdate.setName(request.getName());
        }
        if (request.getCpf() != null) {
            accountToUpdate.setCpf(request.getCpf());
        }
        if (request.getEmail() != null) {
            accountToUpdate.setEmail(request.getEmail());
        }
        if (request.getPassword() != null) {
            accountToUpdate.setPassword(encoder.encode(request.getPassword()));
        }
        if (request.getRoles() != null) {
            accountToUpdate.setRoles(request.getRoles());
        }


        return accountRepository.save(accountToUpdate);
    }

    public Account deleteAccount(Long id) {
        Account accountToDelete = getAccountById(id);
        accountRepository.delete(accountToDelete);
        return accountToDelete;
    }




}
