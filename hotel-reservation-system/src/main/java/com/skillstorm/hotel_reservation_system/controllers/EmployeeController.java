package com.skillstorm.hotel_reservation_system.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hotel_reservation_system.models.Employee;
import com.skillstorm.hotel_reservation_system.services.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin({ "http://localhost:4200/" })
public class EmployeeController {

    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Gets all room descriptions
    @GetMapping
    public ResponseEntity<List<Employee>> getRooms() {
        try {
            List<Employee> employees = employeeService.findAllEmployees();
            return new ResponseEntity<>(employees, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @GetMapping("/user")
    public ResponseEntity<Employee> getEmployeeByEmail(@RequestParam String email) {
        try {
            Employee foundEmployee = employeeService.findEmployeeByEmail(email);
            return new ResponseEntity<>(foundEmployee, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @GetMapping("/credentials")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal OidcUser principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        Employee foundEmployee = employeeService.findEmployeeByEmail(principal.getEmail());

        if (foundEmployee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee does not exist");
        }

        return ResponseEntity.ok(foundEmployee);
    }

    // Creates a room description
    @PostMapping
    public ResponseEntity<Employee> createRoom(@RequestBody Employee employee) {
        try {
            Employee createdEmployee = employeeService.createEmployee(employee);
            return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }
}
