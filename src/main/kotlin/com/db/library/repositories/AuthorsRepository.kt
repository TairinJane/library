package com.db.library.repositories

import com.db.library.entities.Author
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AuthorsRepository: JpaRepository<Author, Int> {
}