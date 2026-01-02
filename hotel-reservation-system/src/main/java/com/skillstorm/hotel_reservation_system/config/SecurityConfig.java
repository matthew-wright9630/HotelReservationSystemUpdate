package com.skillstorm.hotel_reservation_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

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

                        .requestMatchers(HttpMethod.POST, "/room-descriptions").permitAll()
                        // Currently allows all POST method requests to the /room-description endpoint.
                        // This will need to be changed later to role-specific

                        .anyRequest().authenticated());

        http.oauth2Login(Customizer.withDefaults());

        return http.build();
    }
}
