package com.g4appdev.bookKeepers.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "tblLibrarian")
public class LibrarianEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lid;

    private String username;
    private String password;

    private boolean isLibrarian; // New attribute to differentiate accounts

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "uid")
    @JsonBackReference
    private LibraryUserEntity userID;

    public LibrarianEntity() {
    }

    public LibrarianEntity(int lid, String username, String password, boolean isLibrarian, LibraryUserEntity userID) {
        this.lid = lid;
        this.username = username;
        this.password = password;
        this.isLibrarian = isLibrarian;
        this.userID = userID;
    }

    // Getters and setters
    public int getLid() {
        return lid;
    }

    public void setLid(int lid) {
        this.lid = lid;
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

    public boolean isLibrarian() {
        return isLibrarian;
    }

    public void setLibrarian(boolean isLibrarian) {
        this.isLibrarian = isLibrarian;
    }

    public LibraryUserEntity getUserID() {
        return userID;
    }

    public void setUserID(LibraryUserEntity userID) {
        this.userID = userID;
    }
}