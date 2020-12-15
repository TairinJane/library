package com.db.library.controllers

import com.db.library.entities.Reader
import com.db.library.repositories.ReadersRepository
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@CrossOrigin("http://localhost:3000")
@RestController
class ReadersController(private val readersRepository: ReadersRepository) {

    //familiya == first name in bd (should be last name)
    @GetMapping("/readers")
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
}