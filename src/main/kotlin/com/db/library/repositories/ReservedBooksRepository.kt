package com.db.library.repositories

import com.db.library.entities.ReservedBook
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReservedBooksRepository: JpaRepository<ReservedBook, Int> {
    fun getAllByBookIdOrderByReservationDateAsc(bookId: Int): List<ReservedBook>
}