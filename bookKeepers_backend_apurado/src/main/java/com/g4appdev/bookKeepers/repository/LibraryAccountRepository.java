package com.g4appdev.bookKeepers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g4appdev.bookKeepers.entity.LibraryAccountEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibraryAccountRepository extends JpaRepository<LibraryAccountEntity, Integer> {

    // User-defined method to search for a student record by last name
    public List<LibraryAccountEntity> findByusername(String username);
    
    Optional<LibraryAccountEntity> findByUsername(String username);
}