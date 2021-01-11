package com.db.library.controllers

import com.db.library.entities.BorrowedBook
import com.db.library.entities.Reader
import com.db.library.repositories.BorrowedBooksRepository
import com.db.library.repositories.ReadersRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDate

@CrossOrigin
@RestController
@RequestMapping("/api/readers")
class ReadersController(private val readersRepository: ReadersRepository, private val borrowedBooksRepository: BorrowedBooksRepository) {

    //familiya == first name in bd (should be last name)
    @GetMapping
    fun readers(@RequestParam(defaultValue = "") firstName: String, @RequestParam(defaultValue = "") lastName: String): List<Reader> {
        println("request: $firstName $lastName")
        return if (firstName.isNotEmpty() && lastName.isNotEmpty())
            readersRepository.findAllByFirstNameAndLastName(lastName, firstName)
        else if (lastName.isNotEmpty())
            readersRepository.findAllByFirstName(lastName)
        else if (firstName.isNotEmpty())
            readersRepository.findAllByLastName(firstName)
        else emptyList()
    }

    @GetMapping("/{id}")
    fun reader(@PathVariable id: Int): Reader {
        println("reader $id")
        try {
            return readersRepository.getOne(id)
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/{id}/history")
    fun history(@PathVariable id: Int): List<BorrowedBook> {
        println("history for $id")
        return borrowedBooksRepository.findAllByReaderId(id)
    }

    @GetMapping("/{id}/hands")
    fun hands(@PathVariable id: Int): List<BorrowedBook> {
        println("hands for $id")
        return borrowedBooksRepository.findAllByReaderIdAndReturnDateIsNull(id)
    }

    @PostMapping("/new")
    fun newReader(@RequestParam firstName: String, @RequestParam lastName: String, @RequestParam(required = false) patronymic: String, @RequestParam birthDate: LocalDate): Reader {
        val reader = Reader(lastName, firstName, patronymic, birthDate)
        return readersRepository.save(reader)
    }

    @GetMapping("/return/{id}")
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