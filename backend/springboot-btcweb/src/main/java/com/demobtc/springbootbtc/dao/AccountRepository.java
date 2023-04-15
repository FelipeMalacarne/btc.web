package com.demobtc.springbootbtc.dao;

import com.demobtc.springbootbtc.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountName(String accountName);

    Boolean existsByAccountName(String accountName);

    Boolean existsByEmail(String email);
}
