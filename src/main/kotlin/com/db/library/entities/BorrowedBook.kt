package com.db.library.entities

import org.hibernate.annotations.Generated
import org.springframework.lang.Nullable
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
        var borrowDate: LocalDate = LocalDate.now(),
        var dueDate: LocalDate = LocalDate.now().plusDays(10),
        @Nullable
        var returnDate: LocalDate? = null,
        @Id
        @Column(name = "borrow_id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int = 0
)