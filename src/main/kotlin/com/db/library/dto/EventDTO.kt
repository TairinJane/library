package com.db.library.dto

import java.time.LocalDate

class EventDTO(
    val title: String,
    val eventDate: LocalDate,
    val eventPlace: String,
)