package com.g4appdev.bookKeepers.controller;

import com.g4appdev.bookKeepers.entity.LibrarianEntity;
import com.g4appdev.bookKeepers.service.LibrarianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/librarians")
public class LibrarianController {

    @Autowired
    private LibrarianService librarianService;

    @GetMapping
    public List<LibrarianEntity> getAllLibrarians() {
        return librarianService.getAllLibrarians();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LibrarianEntity> getLibrarianById(@PathVariable int id) {
        LibrarianEntity librarian = librarianService.getLibrarianById(id);
        return librarian != null ? ResponseEntity.ok(librarian) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public LibrarianEntity createLibrarian(@RequestBody LibrarianEntity librarianEntity) {
        return librarianService.createLibrarian(librarianEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LibrarianEntity> updateLibrarian(@PathVariable int id, @RequestBody LibrarianEntity librarianEntity) {
        LibrarianEntity existingLibrarian = librarianService.getLibrarianById(id);
        if (existingLibrarian != null) {
            librarianEntity.setLid(id);
            return ResponseEntity.ok(librarianService.updateLibrarian(librarianEntity));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLibrarian(@PathVariable int id) {
        librarianService.deleteLibrarian(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<LibrarianEntity> getLibrarianByUsername(@PathVariable String username) {
        LibrarianEntity librarian = librarianService.getLibrarianByUsername(username);
        return librarian != null ? ResponseEntity.ok(librarian) : ResponseEntity.notFound().build();
    }

    // ADD THE LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LibrarianEntity loginRequest) {
        LibrarianEntity librarian = librarianService.getLibrarianByUsername(loginRequest.getUsername());

        // Check if the librarian exists and the password matches
        if (librarian != null && librarian.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Librarian login successful!");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password.");
        }
    }
}
