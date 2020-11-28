package com.db.library.entities

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "borrowed_books")
class BorrowedBook(
        @ManyToOne
        @JoinColumn(name = "book_id")
        var book: Book,
        @ManyToOne
        @JoinColumn(name = "reader_id")
        var reader: Reader,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "employee_id")
        var employee: Employee,
        var borrowDate: LocalDate,
        var dueDate: LocalDate,
        var returnDate: LocalDate
) {
    @Id
    @Column(name = "borrow_id")
    var id: Int = 0
}