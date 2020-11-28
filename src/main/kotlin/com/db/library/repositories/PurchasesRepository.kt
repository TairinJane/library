package com.db.library.repositories

import com.db.library.entities.Purchase
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PurchasesRepository: JpaRepository<Purchase, Int> {
}