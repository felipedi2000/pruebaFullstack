package com.persistencia.apiweb.jpa.repository;

import com.persistencia.apiweb.jpa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailUserAndPasswordUser(String email, String password);

    Optional<User> findByEmailUser(String emailUser);

}
