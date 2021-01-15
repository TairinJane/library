package com.db.library.repositories

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import com.db.library.entities.Event

@Repository
interface EventsRepository: JpaRepository<Event, Int> {
    fun findAllByOrderByEventDateDesc(): List<Event>
}