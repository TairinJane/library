package com.db.library.repositories

import com.db.library.entities.Employee
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface EmployeesRepository: JpaRepository<Employee, Int> {
}