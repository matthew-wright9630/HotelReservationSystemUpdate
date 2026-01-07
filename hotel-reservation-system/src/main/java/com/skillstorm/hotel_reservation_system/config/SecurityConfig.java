package com.skillstorm.hotel_reservation_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(req -> req.requestMatchers(HttpMethod.GET, "/main/loggedout").permitAll()
                        .requestMatchers(HttpMethod.GET, "/rooms").permitAll()
                        // Allows all GET method requests to the /rooms endpoint.

                        .requestMatchers(HttpMethod.POST, "/rooms").permitAll()
                        // Allows all POST method requests to the /rooms endpoint.

                        .requestMatchers(HttpMethod.GET, "/room-descriptions").permitAll()
                        // Allows all GET method requests to the /room-descriptions endpoint.

                        // .requestMatchers(HttpMethod.POST, "/room-descriptions").permitAll()
                        // Currently allows all POST method requests to the /room-description endpoint.
                        // This will need to be changed later to role-specific

                        .requestMatchers(HttpMethod.GET, "/employees/**").permitAll()
                        // Allows all GET method requests to the /employees endpoint.

                        .anyRequest().authenticated())

                .oauth2Login(Customizer.withDefaults())

                .exceptionHandling(exceptions -> exceptions
                        // Handles unauthorized requests and returns a 401 error
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\": \"unauthorized\"}");
                        })
                        // Handles forbidden requests and returns a 403 error
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\": \"forbidden\"}");
                        }));
        return http.build();
    }
}
