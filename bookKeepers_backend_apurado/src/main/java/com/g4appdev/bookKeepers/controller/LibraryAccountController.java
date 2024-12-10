package com.g4appdev.bookKeepers.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g4appdev.bookKeepers.entity.LibraryAccountEntity;
import com.g4appdev.bookKeepers.service.LibraryAccountService;





@RestController
@RequestMapping("/api/library/account")
public class LibraryAccountController {

    @Autowired
    private LibraryAccountService lserv;

    @PostMapping("/postaccountrecord")
    public LibraryAccountEntity postAccountRecord(@RequestBody LibraryAccountEntity acc) {
        return lserv.postAccountRecord(acc);
    }


    @GetMapping("/getAllAccounts")
    public List<LibraryAccountEntity> getAllAccounts() {
        return lserv.getAllAccounts();
    }
    
    @PutMapping("/updateaccount/{aid}")
    public ResponseEntity<LibraryAccountEntity> updateAccount(
            @PathVariable int aid, 
            @RequestBody LibraryAccountEntity newAccountDetails) {
    	LibraryAccountEntity updatedAccount = lserv.putAccountDetails(aid, newAccountDetails);
        return ResponseEntity.ok(updatedAccount);
    }
    
    @DeleteMapping("/deleteaccount/{aid}")
    public String deleteUser(@PathVariable("id") int id) {
        return lserv.deleteUser(id);
    }
    
    
}