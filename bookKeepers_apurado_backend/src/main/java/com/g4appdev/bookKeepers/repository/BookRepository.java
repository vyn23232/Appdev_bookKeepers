package com.g4appdev.bookKeepers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.g4appdev.bookKeepers.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}
