package com.db.library.entities

import java.time.LocalDate
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table
import javax.validation.constraints.Size

@Entity
@Table(name = "employees")
class Employee(
        @Size(max = 50)
        var firstName: String,
        @Size(max = 50)
        var lastName: String,
        @Size(max = 50)
        var patronymic: String,
        var birthDate: LocalDate,
        var startDate: LocalDate,
        var endDate: LocalDate
) {
    @Id
    @Column(name = "employee_id")
    var id: Int = 0
}