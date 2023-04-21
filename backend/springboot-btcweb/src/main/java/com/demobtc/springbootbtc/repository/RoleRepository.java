package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.ERole;
import com.demobtc.springbootbtc.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
