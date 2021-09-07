package com.db.library.repositories

import com.db.library.entities.BorrowedBook
import com.db.library.entities.Reader
import org.springframework.data.jpa.repository.JpaRepository

interface BorrowedBooksRepository : JpaRepository<BorrowedBook, Int> {

    fun findAllByReaderId(readerId: Int): List<BorrowedBook>
    fun findAllByReaderIdOrderByBorrowDateDesc(readerId: Int): List<BorrowedBook>

    fun findAllByReturnDateIsNull(): List<BorrowedBook>

    fun findAllByReturnDateIsNullAndReader(reader: Reader): List<BorrowedBook>

    fun findAllByReaderIdAndReturnDateIsNull(readerId: Int): List<BorrowedBook>

    fun findAllByBookId(bookId: Int): List<BorrowedBook>

    fun findAllByBookIdOrderByBorrowDateDesc(bookId: Int): List<BorrowedBook>

    fun findAllByReturnDateIsNullAndBookId(bookId: Int): List<BorrowedBook>

    fun countAllByBookIdAndReturnDateIsNull(bookId: Int): Int
}