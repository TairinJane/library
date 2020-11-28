package com.db.library.entities

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table
import javax.validation.constraints.Size

@Entity
@Table(name = "departments")
class Department(
        @Size(max = 50)
        var name: String
) {
    @Id
    @Column(name = "department_id")
    var id: Int = 0
}