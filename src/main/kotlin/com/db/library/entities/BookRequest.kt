package com.db.library.entities

import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = "book_requests")
class BookRequest(
        var bookTitle: String,
        @Size(max = 50)
        var bookAuthor: String,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "reader_id")
        var reader: Reader,
        var requestDate: LocalDate,
) {
    @Id
    @Column(name = "request_id")
    var id: Int = 0
}