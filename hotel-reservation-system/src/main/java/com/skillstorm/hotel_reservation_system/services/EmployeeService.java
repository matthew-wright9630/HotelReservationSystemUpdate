package com.skillstorm.hotel_reservation_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.models.Employee;
import com.skillstorm.hotel_reservation_system.repositories.EmployeeRepository;

// Service for the Employee model
@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Finds all employees and returns them.
    public List<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    // Finds a specific employee by their email address
    public Employee findEmployeeByEmail(String email) {
        Employee foundEmployee = employeeRepository.findByEmail(email);
        if (foundEmployee != null) {
            return foundEmployee;
        }
        throw new IllegalArgumentException("Employee does not exist");
    }

    // Creates a new employee.
    // An employee must have ttb@gmail.com in their email address. If it does not,
    // it will be created as a guest.
    public Employee createEmployee(Employee employee) {
        if (employee.getEmail().contains("ttb@gmail.com")) {
            return employeeRepository.save(employee);
        }
        if (!(employee.getRole() == null)) {
            return employeeRepository.save(employee);
        }
        throw new IllegalArgumentException("Employee does not exist");
    }
}
