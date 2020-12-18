package com.db.library.entities

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "readers")
class Reader(
        var firstName: String,
        var lastName: String,
        var patronymic: String,
        var birthDate: LocalDate,
        var registrationDate: LocalDate = LocalDate.now(),
        @Id
        @Column(name = "reader_id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int = 0
)