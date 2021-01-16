package com.db.library.controllers

import com.db.library.dto.AuthorDTO
import com.db.library.entities.Author
import com.db.library.entities.Book
import com.db.library.repositories.AuthorsRepository
import com.db.library.repositories.BooksRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import javax.validation.Valid

@CrossOrigin
@RestController
@RequestMapping("/api/authors")
class AuthorsController(
    private val authorsRepository: AuthorsRepository,
    private val booksRepository: BooksRepository
) {

    @GetMapping
    fun findAuthors(
        @RequestParam(defaultValue = "") firstName: String,
        @RequestParam(defaultValue = "") lastName: String
    ): List<Author> {
        println("findAuthor: $firstName $lastName")
        return if (firstName.isNotEmpty() && lastName.isNotEmpty())
            authorsRepository.findAllByFirstNameAndLastName(firstName, lastName)
        else if (lastName.isNotEmpty())
            authorsRepository.findAllByLastName(lastName)
        else if (firstName.isNotEmpty())
            authorsRepository.findAllByFirstName(firstName)
        else emptyList()
    }

    @GetMapping("/{id}")
    fun getAuthor(@PathVariable id: Int): Author {
        println("author $id")
        try {
            return authorsRepository.getOne(id)
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/{id}/books")
    fun getAuthorBooks(@PathVariable id: Int): List<Book> {
        println("author $id")
        try {
            val author = authorsRepository.getOne(id)
            return booksRepository.findAllByAuthors(author)
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("/new")
    fun newAuthor(@RequestBody @Valid authorDTO: AuthorDTO): Author {
        return authorsRepository.save(
            Author(
                firstName = authorDTO.firstName,
                lastName = authorDTO.lastName,
                patronymic = authorDTO.patronymic,
                birthDate = authorDTO.birthDate,
                deathDate = authorDTO.deathDate
            )
        )
    }
}