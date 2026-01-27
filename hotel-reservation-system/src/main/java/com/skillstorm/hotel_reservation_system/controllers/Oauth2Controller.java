package com.skillstorm.hotel_reservation_system.controllers;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hotel_reservation_system.models.User;
import com.skillstorm.hotel_reservation_system.services.UserService;
import com.skillstorm.hotel_reservation_system.services.Oauth2Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/oauth")
public class Oauth2Controller {

    private final UserService userService;
    private final Oauth2Service oauth2Service;

    public Oauth2Controller(UserService userService, Oauth2Service oauth2Service) {
        this.userService = userService;
        this.oauth2Service = oauth2Service;
    }

    @GetMapping
    public ResponseEntity<?> findRole(@RequestParam String email) {
        User foundUser = userService.findUserByEmail(email);
        if (foundUser != null) {
            return ResponseEntity.ok(foundUser);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist");
    }

    @GetMapping("/credentials")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal OidcUser principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        User foundUser = userService.findUserByEmail(principal.getEmail());

        if (foundUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist");
        }

        return ResponseEntity.ok(foundUser);
    }
}
