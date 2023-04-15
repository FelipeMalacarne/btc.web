package com.demobtc.springbootbtc.dao;

import com.demobtc.springbootbtc.entity.ERole;
import com.demobtc.springbootbtc.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findByName(ERole name);
}
