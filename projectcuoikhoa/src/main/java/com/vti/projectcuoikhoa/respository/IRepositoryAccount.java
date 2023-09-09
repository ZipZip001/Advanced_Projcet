package com.vti.projectcuoikhoa.respository;

import com.vti.projectcuoikhoa.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
@EnableJpaRepositories
public interface IRepositoryAccount extends JpaRepository<Account, Integer> {

    Optional<Account> findOneByEmailAndPassword(String email, String password);
    Optional<Account> findOneByUsernameAndPassword(String username, String password);

}
