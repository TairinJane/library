package com.db.library.controllers

import com.db.library.entities.BorrowedBook
import com.db.library.entities.Reader
import com.db.library.repositories.BorrowedBooksRepository
import com.db.library.repositories.ReadersRepository
import org.springframework.web.bind.annotation.*

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
}