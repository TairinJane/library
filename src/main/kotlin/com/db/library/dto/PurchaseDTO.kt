package com.db.library.dto

import java.time.LocalDate
import javax.validation.constraints.Min
import javax.validation.constraints.Size

class PurchaseDTO(
    var supplier: String,
    var purchaseDate: LocalDate = LocalDate.now(),
    var deliveryDate: LocalDate,
    var books: List<PurchaseBookDTO>
)

class PurchaseBookDTO(
    @Size(min = 13, max = 13)
    var isbn: String,
    @Min(1)
    var amount: Int
)