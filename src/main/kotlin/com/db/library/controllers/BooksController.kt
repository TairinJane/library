package com.db.library.controllers

import com.db.library.dto.BookAvailableDTO
import com.db.library.dto.toBookAvailableDTO
import com.db.library.entities.Book
import com.db.library.entities.BorrowedBook
import com.db.library.repositories.BooksRepository
import com.db.library.repositories.BorrowedBooksRepository
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/api/books")
class BooksController(private val booksRepository: BooksRepository, private val borrowedBooksRepository: BorrowedBooksRepository) {

    @GetMapping
    fun books(@RequestParam(defaultValue = "") title: String,
              @RequestParam(defaultValue = "") authorFirstName: String,
              @RequestParam(defaultValue = "") authorLastName: String,
              @RequestParam(defaultValue = "false") available: Boolean): List<BookAvailableDTO> {
        println("request: $title $authorFirstName $authorLastName")
        val result: List<Book> = if (authorFirstName.isNotEmpty() && authorLastName.isNotEmpty())
            booksRepository.findAllByAuthor(authorLastName, authorFirstName)
        else if (authorFirstName.isNotEmpty())
            booksRepository.findAllByAuthorLastName(authorFirstName)
        else if (authorLastName.isNotEmpty())
            booksRepository.findAllByAuthorFirstName(authorLastName)
        else if (title.isNotEmpty())
            booksRepository.findAllByTitleContainingIgnoreCase(title)
        else emptyList()

        val availability: List<BookAvailableDTO> = result.map { book ->
            book.toBookAvailableDTO(book.amount - borrowedBooksRepository.countAllByBookIdAndReturnDateIsNull(book.id)) }

        return if (available) availability.filter { it.available > 0 }
        else availability
    }

    @GetMapping("/{id}/history")
    fun bookHistory(@PathVariable id: Int): List<BorrowedBook> {
        println("book history for $id")
        return borrowedBooksRepository.findAllByBookId(id)
    }

    @GetMapping("/{id}/hands")
    fun bookOnHands(@PathVariable id: Int): Int {
        println("book on hands for $id")
        return borrowedBooksRepository.countAllByBookIdAndReturnDateIsNull(id)
    }
}