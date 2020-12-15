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

    @GetMapping("/hello")
    fun hello() = "hello library"

    @GetMapping("/books")
    fun books(@RequestParam title: String): List<Book> {
        println("request: $title")
        return booksRepository.findAllByTitleIsLike(title)
    }
}