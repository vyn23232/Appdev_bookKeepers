package com.g4appdev.bookKeepers.repository;

import com.g4appdev.bookKeepers.entity.LibrarianEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibrarianRepository extends JpaRepository<LibrarianEntity, Integer> {
    LibrarianEntity findByUsername(String username);
}
