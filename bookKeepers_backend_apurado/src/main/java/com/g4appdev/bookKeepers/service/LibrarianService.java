package com.g4appdev.bookKeepers.service;

import com.g4appdev.bookKeepers.entity.LibrarianEntity;
import com.g4appdev.bookKeepers.repository.LibrarianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibrarianService {

    @Autowired
    private LibrarianRepository librarianRepository;

    public List<LibrarianEntity> getAllLibrarians() {
        return librarianRepository.findAll();
    }

    public LibrarianEntity getLibrarianById(int id) {
        return librarianRepository.findById(id).orElse(null);
    }

    public LibrarianEntity createLibrarian(LibrarianEntity librarianEntity) {
        librarianEntity.setLibrarian(true); // Ensure the librarian flag is true
        return librarianRepository.save(librarianEntity);
    }

    public LibrarianEntity updateLibrarian(LibrarianEntity librarianEntity) {
        return librarianRepository.save(librarianEntity);
    }

    public void deleteLibrarian(int id) {
        librarianRepository.deleteById(id);
    }

    public LibrarianEntity getLibrarianByUsername(String username) {
        return librarianRepository.findByUsername(username);
    }
}
