package com.g4appdev.bookKeepers.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g4appdev.bookKeepers.entity.LibraryAccountEntity;
import com.g4appdev.bookKeepers.entity.LibraryUserEntity;
import com.g4appdev.bookKeepers.repository.LibraryAccountRepository;
import com.g4appdev.bookKeepers.repository.LibraryUserRepository;



@Service
public class LibraryAccountService {

    @Autowired
    private LibraryAccountRepository lrepo;

    @Autowired
    private LibraryUserRepository urepo;

    public LibraryAccountEntity postAccountRecord(LibraryAccountEntity acc) {

        if (acc.getUserID() == null || acc.getUserID().getUid() <= 0) {
            throw new RuntimeException("Valid User ID is required");
        }

        LibraryUserEntity user = urepo.findById(acc.getUserID().getUid()).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found with UID: " + acc.getUserID().getUid());
        }

        acc.setUserID(user);


        return lrepo.save(acc);
    }

    public LibraryAccountEntity createAccount(String username, String password, LibraryUserEntity user) {
        LibraryAccountEntity newAccount = new LibraryAccountEntity();
        newAccount.setUsername(username);
        newAccount.setPassword(password);
        newAccount.setUserID(user);
        
        
        return lrepo.save(newAccount);
    }

    @SuppressWarnings("finally")
    public LibraryAccountEntity putAccountDetails(int aid, LibraryAccountEntity newAccountDetails) {
        LibraryAccountEntity acc = null;
        try {
            acc = lrepo.findById(aid).orElse(null);
            if (acc == null) {
                throw new NameNotFoundException("Account " + aid + " not found");
            }

            acc.setUsername(newAccountDetails.getUsername());
            acc.setPassword(newAccountDetails.getPassword());
            acc.setUserID(newAccountDetails.getUserID());

        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Account " + aid + " not found");
        } finally {
            return lrepo.save(acc);
        }
    }

    public String deleteUser(int aid) {
        String msg = "";
        if (lrepo.findById(aid).isPresent()) {
            lrepo.deleteById(aid);
            msg = "User Record successfully deleted!";
        } else {
            msg = aid + " NOT found!";
        }
        return msg;
    }

    public List<LibraryAccountEntity> getAllAccounts() {
        return lrepo.findAll();
    }
}


