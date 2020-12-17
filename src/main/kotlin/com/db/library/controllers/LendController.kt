package com.db.library.controllers

import com.db.library.entities.BorrowedBook
import com.db.library.repositories.BooksRepository
import com.db.library.repositories.BorrowedBooksRepository
import com.db.library.repositories.EmployeesRepository
import com.db.library.repositories.ReadersRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDate


@CrossOrigin
@RestController
@RequestMapping("/api/lend")
class LendController(private val readersRepository: ReadersRepository,
                     private val borrowedBooksRepository: BorrowedBooksRepository,
                     private val booksRepository: BooksRepository,
                     private val employeesRepository: EmployeesRepository) {

    @GetMapping
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

    @GetMapping("/{id}/return")
    fun returnBook(@PathVariable id: Int): BorrowedBook {
        try {
            val book = borrowedBooksRepository.getOne(id)
            book.returnDate = LocalDate.now()
            borrowedBooksRepository.save(book)
            println("returned book: $id")
            return book
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
    }
}