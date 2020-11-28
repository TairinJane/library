package com.db.library.entities

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "reserved_books")
class ReservedBook(
        @ManyToOne
        @JoinColumn(name = "book_id")
        var book: Book,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "reader_id")
        var reader: Reader,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "employee_id")
        var employee: Employee,
        var reservationDate: LocalDate,
) {
    @Id
    @Column(name = "reservation_id")
    var id: Int = 0
}