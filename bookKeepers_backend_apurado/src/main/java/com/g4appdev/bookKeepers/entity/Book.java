package com.g4appdev.bookKeepers.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tblBook")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long book_ID;
    private String title;
    private Integer category;
    private String author;
    private String publisher;
    private String publish_date;
    private boolean isAvailable;  // New field

    // Getters and setters for the existing fields
    public Long getBook_ID() {
        return book_ID;
    }

    public void setBook_ID(Long book_ID) {
        this.book_ID = book_ID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getPublish_date() {
        return publish_date;
    }

    public void setPublish_date(String publish_date) {
        this.publish_date = publish_date;
    }

    // Getters and setters for isAvailable
    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
