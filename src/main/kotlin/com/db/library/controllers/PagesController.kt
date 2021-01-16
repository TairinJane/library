package com.db.library.controllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping

@CrossOrigin
@Controller
class PagesController {

    @GetMapping("/", "/readers/**", "/books/**", "/purchases/**", "/events/**", "/authors/**")
    fun index() = "index"
}