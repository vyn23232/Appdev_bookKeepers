package com.g4appdev.bookKeepers.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.g4appdev.bookKeepers.entity.Book;
import com.g4appdev.bookKeepers.repository.BookRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Book with ID " + id + " not found"));
    }

    public Book updateBook(Long id, Book newBookDetails) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(newBookDetails.getTitle());
            book.setAuthor(newBookDetails.getAuthor());
            book.setPublisher(newBookDetails.getPublisher());
            book.setPublish_date(newBookDetails.getPublish_date());
            book.setCategory(newBookDetails.getCategory());
            return bookRepository.save(book);
        }).orElseThrow(() -> new NoSuchElementException("Book with ID " + id + " not found"));
    }

    public String deleteBook(Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return "Book with ID " + id + " deleted successfully";
        } else {
            return "Book with ID " + id + " not found!";
        }
    }
}
