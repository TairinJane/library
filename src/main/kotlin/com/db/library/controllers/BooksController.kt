package com.db.library.controllers

import com.db.library.dto.BookAvailableDTO
import com.db.library.dto.toBookAvailableDTO
import com.db.library.entities.Book
import com.db.library.entities.BorrowedBook
import com.db.library.repositories.BooksRepository
import com.db.library.repositories.BorrowedBooksRepository
import com.db.library.repositories.EmployeesRepository
import com.db.library.repositories.ReadersRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@CrossOrigin
@RestController
@RequestMapping("/api/books")
class BooksController(private val booksRepository: BooksRepository,
                      private val borrowedBooksRepository: BorrowedBooksRepository,
                      private val readersRepository: ReadersRepository,
                      private val employeesRepository: EmployeesRepository) {

    @GetMapping
    fun books(@RequestParam(defaultValue = "") title: String,
              @RequestParam(defaultValue = "") authorFirstName: String,
              @RequestParam(defaultValue = "") authorLastName: String,
              @RequestParam(defaultValue = "false") available: Boolean): List<BookAvailableDTO> {
        println("request: $title $authorFirstName $authorLastName")
        val result: List<Book> = if (authorFirstName.isNotEmpty() && authorLastName.isNotEmpty())
            booksRepository.findAllByAuthorFirstNameAndLastName(authorFirstName, authorLastName)
        else if (authorFirstName.isNotEmpty())
            booksRepository.findAllByAuthorFirstName(authorFirstName)
        else if (authorLastName.isNotEmpty())
            booksRepository.findAllByAuthorLastName(authorLastName)
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

    @GetMapping("/lend")
    fun lendBook(@RequestParam bookId: Int, @RequestParam readerId: Int, @RequestParam employeeId: Int): BorrowedBook {
        try {
            val book = booksRepository.getOne(bookId)
            val reader = readersRepository.getOne(readerId)
            val employee = employeesRepository.getOne(employeeId)
            val borrowedBook = borrowedBooksRepository.save(BorrowedBook(book, reader, employee))
            println("success: $bookId $readerId $employeeId")
            return borrowedBook
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/due")
    fun dueBooks(): List<BorrowedBook> {
        return borrowedBooksRepository.findAllByReturnDateIsNull()
    }
}