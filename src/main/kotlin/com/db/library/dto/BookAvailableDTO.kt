package com.db.library.dto

import com.db.library.entities.Author
import com.db.library.entities.Book
import com.db.library.entities.Department

data class BookAvailableDTO(
        var id: Int,
        var ISBN: String,
        var title: String,
        var publicationYear: Int,
        var genre: String,
        var amount: Int,
        var department: Department,
        var authors: List<Author>,
        var available: Int
)

fun Book.toBookAvailableDTO(available: Int): BookAvailableDTO {
    return BookAvailableDTO(this.id, this.ISBN, this.title, this.publicationYear, this.genre, this.amount, this.department, this.authors, available)
}