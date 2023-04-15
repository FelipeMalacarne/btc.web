package com.demobtc.springbootbtc.dao;

import com.demobtc.springbootbtc.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByName(String name);

    Boolean existsByName(String name);

    Boolean existsByEmail(String email);
}
