package com.db.library.repositories

import com.db.library.entities.Reader
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReadersRepository : JpaRepository<Reader, Int> {
}