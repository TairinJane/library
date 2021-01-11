package com.db.library.controllers

import com.db.library.entities.Purchase
import com.db.library.repositories.PurchasesRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDate
import java.time.temporal.TemporalAdjusters

@CrossOrigin
@RestController
@RequestMapping("/api/purchases")
class PurchasesController(private val purchasesRepository: PurchasesRepository) {

    @GetMapping
    fun allPurchases(): List<Purchase> {
        try {
            return purchasesRepository.findAllByPurchaseDateAfter(LocalDate.now()
                .with(TemporalAdjusters.firstDayOfYear()).plusMonths(6)).filter { purchase -> purchase.books.isNotEmpty() }
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @GetMapping("/{id}")
    fun purchase(@PathVariable id: Int): Purchase {
        try {
            return purchasesRepository.getOne(id)
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
    }
}