package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Account;
import com.demobtc.springbootbtc.model.ERole;
import com.demobtc.springbootbtc.model.Role;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class AccountRepositoryTests {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PasswordEncoder encoder;

    private Account account;

    @Before
    public void setup() {
        Set<Role> roles = new HashSet<Role>();
        roles.add(Role.builder()
                .id(1L)
                .name(ERole.ROLE_USER)
                .build());

        account = Account.builder()
                .name("Teste")
                .cpf("12345678901")
                .email("testesetup@email.com")
                .password(encoder.encode("123456"))
                .roles(roles)
                .build();
    }

    @Test
    public void givenAccountObject_whenSave_thenReturnSavedAccount(){
        // given
        Account accountToSave = Account.builder()
                .name("Felipe")
                .cpf("12345678901")
                .email("felipe@email.com")
                .password(encoder.encode("123456"))
                .build();
        // when
        Account savedAccount = accountRepository.save(accountToSave);
        // then
        assertThat(savedAccount).isNotNull();
        assertThat(savedAccount.getId()).isGreaterThan(0);
        assertThat(savedAccount.getName()).isEqualTo(accountToSave.getName());
    }

    @Test
    public void givenAccountsList_whenFindAll_thenAccountsList() {
        // given
        Account account1 = Account.builder()
                .name("Felipe")
                .cpf("12345678901")
                .email("felipe@email.com")
                .password(encoder.encode("123456"))
                .build();

        accountRepository.save(account1);
        accountRepository.save(account);
        // when
        List<Account> accountList = accountRepository.findAll();
        // then
        assertThat(accountList).isNotNull();
        assertThat(accountList.size()).isGreaterThanOrEqualTo(2);
    }

    @Test
    public void givenAccount_whenFindById_thenReturnAccount(){
        // given
        Account savedAccount = accountRepository.save(account);
        // when
        Account foundAccount = accountRepository.findById(savedAccount.getId()).orElse(null);
        // then
        assertThat(foundAccount).isNotNull();
        assertThat(foundAccount.getId()).isEqualTo(savedAccount.getId());
        assertThat(foundAccount.getName()).isEqualTo(savedAccount.getName());
    }

    @Test
    public void givenAccount_whenUpdate_thenReturnUpdatedAccount(){
        // given
        Account savedAccount = accountRepository.save(account);
        // when
        savedAccount.setName("Teste Update");
        Account updatedAccount = accountRepository.save(savedAccount);
        // then
        assertThat(updatedAccount).isNotNull();
        assertThat(updatedAccount.getId()).isEqualTo(savedAccount.getId());
        assertThat(updatedAccount.getName()).isEqualTo(savedAccount.getName());
    }

    public void givenAccount_whenDelete_thenAccountDeleted(){
        // given
        Account savedAccount = accountRepository.save(account);
        // when
        accountRepository.delete(savedAccount);
        // then
        assertThat(accountRepository.findById(savedAccount.getId())).isEmpty();
    }
}
