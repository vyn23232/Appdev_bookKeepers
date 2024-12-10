package com.g4appdev.bookKeepers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g4appdev.bookKeepers.entity.LibraryUserEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibraryUserRepository extends JpaRepository<LibraryUserEntity, Integer> {

    // User-defined method to search for a student record by last name
    public List<LibraryUserEntity> findByLname(String lname);

    Optional<LibraryUserEntity> findByEmail(String email);
    // You can define more custom methods for searching here
}