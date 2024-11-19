package com.g4appdev.bookKeepers.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g4appdev.bookKeepers.dto.RegisterRequest;
import com.g4appdev.bookKeepers.entity.LibraryAccountEntity;
import com.g4appdev.bookKeepers.entity.LibraryUserEntity;
import com.g4appdev.bookKeepers.repository.LibraryAccountRepository;
import com.g4appdev.bookKeepers.service.LibraryAccountService;
import com.g4appdev.bookKeepers.service.LibraryUserService;



@RestController
@RequestMapping("/api/library/user")
public class LibraryUserController {
	
	@Autowired
	private LibraryAccountRepository lrepo;

    @Autowired
    private LibraryUserService lserv;
    
    @Autowired
    private LibraryAccountService accountService;


    @PostMapping("/postuserrecord")
    public LibraryUserEntity postUserRecord(@RequestBody LibraryUserEntity library) {
        return lserv.postUserRecord(library);
    }

    @GetMapping("/getAllUsers")
    public List<LibraryUserEntity> getAllUsers() {
        return lserv.getAllUsers();
    }
    
    @PutMapping("/updateuser/{id}")
    public ResponseEntity<LibraryUserEntity> updateUser(
            @PathVariable int id, 
            @RequestBody LibraryUserEntity newUserDetails) {
        LibraryUserEntity updatedUser = lserv.putUserDetails(id, newUserDetails);
        return ResponseEntity.ok(updatedUser); // Return HTTP 200 with the updated user
    }
    
    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return lserv.deleteUser(id);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
        LibraryUserEntity user = new LibraryUserEntity();
        user.setFname(request.getFname());
        user.setLname(request.getLname());
        user.setMname(request.getMname());
        user.setCourse(request.getCourse());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        
        // Save user
        LibraryUserEntity savedUser = lserv.postUserRecord(user);
        
        // Create Account using email as username
        LibraryAccountEntity newAccount = accountService.createAccount(savedUser.getEmail(), request.getPassword(), savedUser);
        
        return ResponseEntity.ok("User registered successfully: " + savedUser.getUid() + ", Account created with username: " + newAccount.getUsername());
    }

    
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LibraryAccountEntity loginRequest) {
        // Attempt to find account by username (which is the email)
        LibraryAccountEntity foundAccount = lrepo.findByUsername(loginRequest.getUsername())
            .orElse(null);

        if (foundAccount == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found with username: " + loginRequest.getUsername());
        }

        // Validate password
        if (!foundAccount.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        return ResponseEntity.ok("Login successful for user: " + foundAccount.getUsername());
    }




    

}