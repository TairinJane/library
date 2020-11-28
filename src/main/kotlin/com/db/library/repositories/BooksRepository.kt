package com.db.library.repositories

import com.db.library.entities.Book
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BooksRepository: JpaRepository<Book, Int> {
}