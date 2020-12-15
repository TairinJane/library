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
    fun books(@RequestParam(defaultValue = "") title: String, @RequestParam(defaultValue = "") authorFirstName: String, @RequestParam(defaultValue = "") authorLastName: String): List<Book> {
        println("request: $title $authorFirstName $authorLastName")
        return if (authorFirstName.isNotEmpty() && authorLastName.isNotEmpty())
            booksRepository.findAllByAuthor(authorLastName, authorFirstName)
        else if (authorFirstName.isNotEmpty())
            booksRepository.findAllByAuthorLastName(authorFirstName)
        else if (authorLastName.isNotEmpty())
            booksRepository.findAllByAuthorFirstName(authorLastName)
        else if (title.isNotEmpty())
            booksRepository.findAllByTitleContainingIgnoreCase(title)
        else emptyList()
    }
}