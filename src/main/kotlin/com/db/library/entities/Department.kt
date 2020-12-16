package com.db.library.entities

import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = "departments")
class Department(
        @Size(max = 50)
        var name: String,
        @Id
        @Column(name = "department_id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int = 0
)