package com.db.library.repositories

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.w3c.dom.events.Event

@Repository
interface EventsRepository: JpaRepository<Event, Int> {
}