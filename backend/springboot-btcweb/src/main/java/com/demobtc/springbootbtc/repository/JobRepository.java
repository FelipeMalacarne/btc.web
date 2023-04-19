package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.ERole;
import com.demobtc.springbootbtc.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findByName(ERole name);
}
