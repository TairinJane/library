package com.db.library.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class BooksController {

    @GetMapping("/hello")
    fun hello() = "hello library"
}