package com.skillstorm.hotel_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.hotel_reservation_system.models.Employee;

//Repository for the Employee model.
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    public Employee findByEmail(String email);
}
