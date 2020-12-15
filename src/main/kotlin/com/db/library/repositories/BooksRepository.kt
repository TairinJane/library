package com.db.library.repositories

import com.db.library.entities.Book
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface BooksRepository: JpaRepository<Book, Int> {
    fun findAllByTitle(title: String)
    fun findAllByTitleIsLike(title: String): List<Book>
    @Query("select b from Book b join Author a where a.firstName = ?1 and a.lastName = ?2")
    fun findAllByAuthor(authorFirstName: String, authorLastName: String)
    fun findAllByPublicationYearBetween(startYear: Int, endYear: Int)
}