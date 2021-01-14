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
        var purchaseDate: LocalDate = LocalDate.now(),
        var deliveryDate: LocalDate,
        @Id
        @Column(name = "purchase_id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int = 0
) {
        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "purchaseId")
//        @JoinColumn(name = "purchase_id")
        var books: List<PurchaseBook> = emptyList()
}