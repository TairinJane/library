package com.db.library.entities

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "purchases")
class Purchase(
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "employee_id")
        var employee: Employee,
        var supplier: String,
        var purchaseDate: LocalDate,
        var deliveryDate: LocalDate,
        @OneToMany(fetch = FetchType.LAZY)
        @JoinColumn(name = "purchase_id")
        var books: List<PurchaseBook>
) {
    @Id
    @Column(name = "purchase_id")
    var id: Int = 0
}