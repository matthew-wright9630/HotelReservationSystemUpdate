package com.skillstorm.hotel_reservation_system.controllers;

import java.io.IOException;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/users")
public class Oauth2Controller {

    @GetMapping("/logout")
    public void logout(HttpServletRequest req, HttpServletResponse res) throws IOException {
        req.getSession().invalidate();
        res.setHeader("Clear-Site-Data", "\"cookies\"");
        res.sendRedirect("http://localhost:4200/homepage");
    }
}
