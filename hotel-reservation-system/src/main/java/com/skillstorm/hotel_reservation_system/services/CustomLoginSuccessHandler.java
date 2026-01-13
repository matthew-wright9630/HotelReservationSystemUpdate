package com.skillstorm.hotel_reservation_system.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.skillstorm.hotel_reservation_system.models.User;
import com.skillstorm.hotel_reservation_system.repositories.UserRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    public CustomLoginSuccessHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Value("${frontend.base-url}")
    private String frontendBaseUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OidcUser oidcUser = (OidcUser) authentication.getPrincipal();
        User user = userRepository.findByEmail(oidcUser.getEmail());

        if (user == null) {
            response.sendRedirect("/login/error");
            return;
        }

        // Check if onboarding is complete
        if (!user.isProfileComplete()) {
            response.sendRedirect("/onboarding");
            return;
        }

        // Redirect based on role
        switch (user.getRole()) {
            case admin, manager -> response.sendRedirect(frontendBaseUrl + "/employee");
            default -> response.sendRedirect(frontendBaseUrl + "/homepage");
        }
    }
}
