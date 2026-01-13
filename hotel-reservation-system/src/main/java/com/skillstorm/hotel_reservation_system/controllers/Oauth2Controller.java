package com.skillstorm.hotel_reservation_system.controllers;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hotel_reservation_system.models.Employee;
import com.skillstorm.hotel_reservation_system.models.Guest;
import com.skillstorm.hotel_reservation_system.services.EmployeeService;
import com.skillstorm.hotel_reservation_system.services.Oauth2Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/users")
public class Oauth2Controller {

    private final EmployeeService employeeService;
    private final Oauth2Service oauth2Service;

    public Oauth2Controller(EmployeeService employeeService, Oauth2Service oauth2Service) {
        this.employeeService = employeeService;
        this.oauth2Service = oauth2Service;
    }

    @GetMapping
    public ResponseEntity<?> findRole(@RequestParam String email) {
        Employee foundEmployee = employeeService.findEmployeeByEmail(email);
        if (foundEmployee != null) {
            return ResponseEntity.ok(foundEmployee);
        }
        Guest guest;
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee does not exist");
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest req, HttpServletResponse res) throws IOException {
        req.getSession().invalidate();
        res.setHeader("Clear-Site-Data", "\"cookies\"");
        res.sendRedirect("http://localhost:4200/homepage");
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
}
