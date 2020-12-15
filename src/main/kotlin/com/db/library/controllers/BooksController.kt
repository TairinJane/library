package com.db.library.controllers

import com.db.library.entities.Book
import com.db.library.repositories.BooksRepository
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@CrossOrigin("http://localhost:3000")
@RestController
class BooksController(private val booksRepository: BooksRepository) {

    @GetMapping("/books")
    fun books(@RequestParam title: String, @RequestParam authorFirstName: String, @RequestParam authorLastName: String): List<Book> {
        println("request: $title $authorFirstName $authorLastName")
        return booksRepository.findAllByTitleContainingIgnoreCase(title)
    }
}