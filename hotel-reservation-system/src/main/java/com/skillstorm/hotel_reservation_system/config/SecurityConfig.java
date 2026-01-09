package com.skillstorm.hotel_reservation_system.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import com.skillstorm.hotel_reservation_system.services.CustomEmployeeLoginService;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomEmployeeLoginService customEmployeeLoginService;

    // Constructor injection
    public SecurityConfig(CustomEmployeeLoginService customEmployeeLoginService) {
        this.customEmployeeLoginService = customEmployeeLoginService;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(req -> req.requestMatchers(HttpMethod.GET, "/main/loggedout").permitAll()
                        .requestMatchers(HttpMethod.GET, "/rooms").permitAll()
                        // Allows all GET method requests to the /rooms endpoint.

                        .requestMatchers(HttpMethod.GET, "/rooms/availability").permitAll()

                        .requestMatchers(HttpMethod.POST, "/rooms").permitAll()
                        // Allows all POST method requests to the /rooms endpoint.

                        .requestMatchers(HttpMethod.GET, "/room-descriptions/**").permitAll()
                        // Allows all GET method requests to the /room-descriptions endpoint.

                        .requestMatchers(HttpMethod.POST, "/room-descriptions").hasAnyRole("admin", "manager")
                        // All POST requests to room descriptions should be made only by an admin or a
                        // manager

                        .requestMatchers(HttpMethod.GET, "/employees/**").permitAll()
                        // Allows all GET method requests to the /employees endpoint.

                        .requestMatchers(HttpMethod.GET, "/users/**").permitAll()
                        // Allows all GET method requests to the /users endpoint.

                        .requestMatchers(HttpMethod.POST, "/employees").hasRole("admin")
                        // All POST requests to the /employees endpoint should be made only by a user
                        // with an admin role.
                        // This is because only managers should be able to create a new employee.

                        .anyRequest().authenticated())

                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:4200/homepage", true) // Angular route
                        .failureUrl("http://localhost:4200/login/error"))

                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessUrl("http://localhost:4200/homepage") // angular route
                )

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
                        }))
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:4200"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowCredentials(true);
                    config.setAllowedHeaders(List.of("*"));
                    return config;
                }));
        return http.build();
    }
}
