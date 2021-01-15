package com.db.library.controllers

import com.db.library.dto.EventDTO
import com.db.library.entities.Event
import com.db.library.repositories.EmployeesRepository
import com.db.library.repositories.EventsRepository
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/api/events")
class EventsController(
    private val eventsRepository: EventsRepository,
    private val employeesRepository: EmployeesRepository
) {

    @GetMapping
    fun getEvents(): List<Event> {
        return eventsRepository.findAllByOrderByEventDateDesc()
    }

    @PostMapping("/new")
    fun newEvent(@RequestBody eventDTO: EventDTO): Event {
        val employee = employeesRepository.getOne(30)
        return eventsRepository.save(
            Event(
                title = eventDTO.title,
                eventDate = eventDTO.eventDate,
                eventPlace = eventDTO.eventPlace,
                employee = employee
            )
        )
    }
}