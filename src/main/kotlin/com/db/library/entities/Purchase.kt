package com.db.library.entities

import com.fasterxml.jackson.annotation.JsonBackReference
import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "purchases")
class Purchase(
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "employee_id")
        var employee: Employee,
        var supplier: String,
        var purchaseDate: LocalDate = LocalDate.now(),
        var deliveryDate: LocalDate,
        @OneToMany(fetch = FetchType.LAZY)
        @JoinColumn(name = "purchase_id")
        var books: List<PurchaseBook>,
        @Id
        @Column(name = "purchase_id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int = 0
)