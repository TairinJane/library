package com.db.library.repositories

import com.db.library.entities.PurchaseBook
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PurchasesBooksRepository : JpaRepository<PurchaseBook, Int> {
    fun getAllByPurchaseId(purchaseId: Int): List<PurchaseBook>
}