package com.example.hackathon.repository;

import com.example.hackathon.bean.Role;
import com.example.hackathon.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    //find by role
    User findByRole(Role role);

    Optional<User> findByName(String name);




    // Optional<User> findByUsername(String username);
}
