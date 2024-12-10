package com.g4appdev.bookKeepers.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "tblLibraryUser")
public class LibraryUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;

    private String fname;
    private String lname;
    private String mname;
    private String course;
    private String email;
    private String phone;

    @OneToMany(mappedBy = "userID", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference // Manage the serialization of the account references
    private List<LibraryAccountEntity> accounts;

    
    
    public LibraryUserEntity() {
    }

    public LibraryUserEntity(int uid, String fname, String lname, String mname, String course, String email, String phone) {
        this.uid = uid;
        this.fname = fname;
        this.lname = lname;
        this.mname = mname;
        this.course = course;
        this.email = email;
        this.phone = phone;
    }

    // Getters and setters

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }
    
    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public List<LibraryAccountEntity> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<LibraryAccountEntity> accounts) {
        this.accounts = accounts;
    }
    
}