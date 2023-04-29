package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByName(String name);

    Boolean existsByName(String name);

    Boolean existsByEmail(String email);
}
