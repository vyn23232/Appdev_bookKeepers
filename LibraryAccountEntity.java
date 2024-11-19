package com.g4appdev.bookKeepers.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "tblLibraryAccount")
public class LibraryAccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int aid;

    private String username;
    private String password;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "uid")
    @JsonBackReference // Prevent serialization of this reference to avoid infinite loop
    private LibraryUserEntity userID;

    public LibraryAccountEntity() {
    }

    public LibraryAccountEntity(int aid, String username, String password, LibraryUserEntity userID) {
        this.aid = aid;
        this.username = username;
        this.password = password;
        this.userID = userID; // Initialize the user
    }

    // Getters and setters
    public int getAid() {
        return aid;
    }

    public void setAid(int aid) {
        this.aid = aid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }

    public LibraryUserEntity getUserID() {
        return userID;
    }

    public void setUserID(LibraryUserEntity userID) {
        this.userID = userID;
    }
}