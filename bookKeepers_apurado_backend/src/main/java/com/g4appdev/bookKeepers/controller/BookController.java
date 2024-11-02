package com.g4appdev.bookKeepers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.g4appdev.bookKeepers.entity.Book;
import com.g4appdev.bookKeepers.service.BookService;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book createdBook = bookService.saveBook(book);
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        if (book == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Book existingBook = bookService.getBookById(id);

        if (existingBook == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Book not found
        }

        // Update existing book fields
        existingBook.setTitle(bookDetails.getTitle());
        existingBook.setAuthor(bookDetails.getAuthor());
        existingBook.setPublisher(bookDetails.getPublisher());
        existingBook.setPublish_date(bookDetails.getPublish_date());
        existingBook.setCategory(bookDetails.getCategory());

        // Save and return the updated Book
        Book updatedBook = bookService.saveBook(existingBook);
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        if (bookService.getBookById(id) == null) {
            return new ResponseEntity<>("Book not found", HttpStatus.NOT_FOUND);
        }
        bookService.deleteBook(id);
        return new ResponseEntity<>("Book removed with id: " + id, HttpStatus.OK);
    }
}
