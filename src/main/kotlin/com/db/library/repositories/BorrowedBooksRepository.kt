package com.db.library.repositories

import com.db.library.entities.BorrowedBook
import com.db.library.entities.Reader
import org.springframework.data.jpa.repository.JpaRepository
import java.time.LocalDate

interface BorrowedBooksRepository: JpaRepository<BorrowedBook, Int> {

    //@Query("select b from BorrowedBook b join b.reader r where r.id = ?1")
    fun findAllByReaderId(readerId: Int): List<BorrowedBook>

    fun findAllByReader(reader: Reader): List<BorrowedBook>

    fun findAllByReturnDateIsNull(): List<BorrowedBook>

    fun findAllByReturnDateIsNullAndReader(reader: Reader): List<BorrowedBook>

    fun findAllByReaderIdAndReturnDateIsNull(readerId: Int): List<BorrowedBook>

    fun findAllByBookId(bookId: Int): List<BorrowedBook>

    fun findAllByReturnDateIsNullAndBookId(bookId: Int): List<BorrowedBook>

    fun countAllByBookIdAndReturnDateIsNull(bookId: Int): Int

    fun findAllByBorrowDateBetween(startDate: LocalDate, endDate: LocalDate): List<BorrowedBook>
}