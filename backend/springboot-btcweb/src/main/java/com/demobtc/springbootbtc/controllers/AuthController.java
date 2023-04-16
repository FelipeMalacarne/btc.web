package com.demobtc.springbootbtc.controllers;

import com.demobtc.springbootbtc.dao.AccountRepository;
import com.demobtc.springbootbtc.dao.JobRepository;
import com.demobtc.springbootbtc.models.Account;
import com.demobtc.springbootbtc.models.ERole;
import com.demobtc.springbootbtc.models.Job;
import com.demobtc.springbootbtc.payload.request.LoginRequest;
import com.demobtc.springbootbtc.payload.request.SignupRequest;
import com.demobtc.springbootbtc.payload.response.JwtResponse;
import com.demobtc.springbootbtc.payload.response.MessageResponse;
import com.demobtc.springbootbtc.security.jwt.JwtUtils;
import com.demobtc.springbootbtc.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    JobRepository jobRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getName(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> jobs = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                jobs));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Validated @RequestBody SignupRequest signUpRequest) {
        if (accountRepository.existsByName(signUpRequest.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (accountRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new account's account
        Account account = new Account(signUpRequest.getName(),
                signUpRequest.getCpf(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strJobs = signUpRequest.getJob();
        Set<Job> jobs = new HashSet<>();

        if (strJobs == null) {
            Job userJob = jobRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Job is not found."));
            jobs.add(userJob);
        } else {
            strJobs.forEach(job -> {
                switch (job) {
                    case "admin":
                        Job adminJob = jobRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Job is not found."));
                        jobs.add(adminJob);

                        break;
                    case "mod":
                        Job modJob = jobRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Job is not found."));
                        jobs.add(modJob);

                        break;
                    default:
                        Job userJob = jobRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Job is not found."));
                        jobs.add(userJob);
                }
            });
        }

        account.setJobs(jobs);
        accountRepository.save(account);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }




}
