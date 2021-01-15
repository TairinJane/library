package com.db.library.entities

import com.fasterxml.jackson.annotation.JsonManagedReference
import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "purchases")
class Purchase(
        @JsonManagedReference
        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "purchase")
        var books: List<PurchaseBook> = emptyList(),
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
)