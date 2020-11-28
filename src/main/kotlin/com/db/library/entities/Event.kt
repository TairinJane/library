package com.db.library.entities

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "events")
class Event(
        var title: String,
        @ManyToOne
        @JoinColumn(name = "employee_id")
        var employee: Employee,
        var eventDate: LocalDate,
        var eventPlace: String
) {
    @Id
    @Column(name = "event_id")
    var id: Int = 0
}