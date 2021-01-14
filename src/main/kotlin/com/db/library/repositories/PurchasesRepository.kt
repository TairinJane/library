package com.db.library.repositories

import com.db.library.entities.Purchase
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface PurchasesRepository: JpaRepository<Purchase, Int> {
    fun findAllByPurchaseDateAfter(startDate: LocalDate): List<Purchase>
    fun findAllByPurchaseDateAfterOrderByDeliveryDateDesc(startDate: LocalDate): List<Purchase>
}