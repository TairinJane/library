package com.db.library.controllers

import com.db.library.dto.PurchaseDTO
import com.db.library.entities.Purchase
import com.db.library.entities.PurchaseBook
import com.db.library.repositories.EmployeesRepository
import com.db.library.repositories.PurchasesRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDate
import javax.validation.Valid

@CrossOrigin
@RestController
@RequestMapping("/api/purchases")
class PurchasesController(
    private val purchasesRepository: PurchasesRepository,
    private val employeesRepository: EmployeesRepository,
) {

    @GetMapping
    fun allPurchases(): List<Purchase> {
        try {
            return purchasesRepository.findAllByPurchaseDateAfterOrderByDeliveryDateDesc(
                LocalDate.now()
                    .minusMonths(6)
            )
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

    @PostMapping("/new")
    fun newPurchase(@RequestBody @Valid purchaseDTO: PurchaseDTO): Purchase {
        val employee = employeesRepository.getOne(30)
        val purchase = Purchase(
            supplier = purchaseDTO.supplier,
            deliveryDate = purchaseDTO.deliveryDate,
            employee = employee,
        )
        val books = purchaseDTO.books.map { dto ->
            PurchaseBook(
                purchase,
                dto.isbn,
                dto.amount
            )
        }
        purchase.books = books
        return purchasesRepository.save(purchase)
    }
}