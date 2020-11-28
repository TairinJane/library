package com.db.library.entities

import javax.persistence.*
import javax.validation.constraints.Min
import javax.validation.constraints.Size

@Entity
@Table(name = "purchases_books")
class PurchaseBook(
        @ManyToOne
        @JoinColumn(name = "purchase_id")
        var purchase: Purchase,
        @Size(min = 13, max = 13)
        var ISBN: String,
        @Min(1)
        var amount: Int
) {
    @Id
    @Column(name = "purchase_book_id")
    var id: Int = 0
}