package com.skillstorm.hotel_reservation_system.controllers;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hotel_reservation_system.models.Employee;
import com.skillstorm.hotel_reservation_system.services.EmployeeService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/users")
public class Oauth2Controller {

    private final EmployeeService employeeService;

    public Oauth2Controller(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<?> findRole(@RequestParam String email) {
        Employee foundEmployee = employeeService.findEmployeeByEmail(email);
        if (foundEmployee != null) {
            return ResponseEntity.ok(foundEmployee);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee does not exist");
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest req, HttpServletResponse res) throws IOException {
        req.getSession().invalidate();
        res.setHeader("Clear-Site-Data", "\"cookies\"");
        res.sendRedirect("http://localhost:4200/homepage");
    }
}
