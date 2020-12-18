package com.db.library.controllers

import com.db.library.entities.Purchase
import com.db.library.repositories.PurchasesRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDate
import java.time.temporal.TemporalAdjusters

@CrossOrigin
@RestController
@RequestMapping("/api/purchases")
class PurchasesController(private val purchasesRepository: PurchasesRepository) {

    @GetMapping
    fun purchases(): List<Purchase> {
        try {
            return purchasesRepository.findAllByPurchaseDateAfter(LocalDate.now()
                .with(TemporalAdjusters.firstDayOfYear()).plusMonths(6))
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}