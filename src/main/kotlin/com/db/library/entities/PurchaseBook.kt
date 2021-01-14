package com.db.library.entities

import javax.persistence.*
import javax.validation.constraints.Min
import javax.validation.constraints.Size

@Entity
@Table(name = "purchases_books")
class PurchaseBook(
        /*@ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "purchase_id")*/
        var purchaseId: Int,
        @Size(min = 13, max = 13)
        var ISBN: String,
        @Min(1)
        var amount: Int,
        @Id
        @Column(name = "purchase_book_id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int = 0
)