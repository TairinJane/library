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
        var registrationDate: LocalDate
) {
    @Id
    @Column(name = "reader_id")
    var id: Int = 0
}
