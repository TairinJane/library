package com.db.library.entities

import javax.persistence.*
import javax.validation.constraints.Min
import javax.validation.constraints.Size

@Entity
@Table(name = "books")
class Book(
        @Size(min = 13, max = 13)
        var ISBN: String,
        var title: String,
        var publicationYear: Int,
        @Size(max = 50)
        var genre: String,
        @Min(0)
        var amount: Int,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "department_id")
        var department: Department,
        @ManyToMany
        @JoinTable(
                name = "books_authors",
                joinColumns = [JoinColumn(name = "book_id")],
                inverseJoinColumns = [JoinColumn(name = "author_id")])
        var authors: List<Author>
) {
    @Id
    @Column(name = "book_id")
    var id: Int = 0
}