package com.db.library.entities

import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = "authors")
class Author(
        @Size(max = 50)
        var firstName: String,
        @Size(max = 50)
        var lastName: String,
        @Size(max = 50)
        var patronymic: String,
        var birthDate: LocalDate,
        var deathDate: LocalDate,
        @ManyToMany(fetch = FetchType.LAZY, mappedBy = "authors")
        var books: List<Book>
) {
    @Id
    @Column(name = "author_id")
    var id: Int = 0
}