package com.g4appdev.bookKeepers.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tblCategory")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer category_ID;

    private String category_Name;

    // Getters and Setters
    public Integer getCategory_ID() {
        return category_ID;
    }

    public void setCategory_ID(Integer category_ID) {
        this.category_ID = category_ID;
    }

    public String getCategory_Name() {
        return category_Name;
    }

    public void setCategory_Name(String category_Name) {
        this.category_Name = category_Name;
    }
}
