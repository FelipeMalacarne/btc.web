package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByName(String name);

    Boolean existsByName(String name);

    Boolean existsByCpf(String cpf);

    Boolean existsByEmail(String email);
}
