package com.skillstorm.hotel_reservation_system.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import com.skillstorm.hotel_reservation_system.services.CustomLoginService;
import com.skillstorm.hotel_reservation_system.services.CustomLoginSuccessHandler;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        private final CustomLoginSuccessHandler customLoginSuccessHandler;

        private final CustomLoginService customUserLoginService;

        // Constructor injection
        public SecurityConfig(CustomLoginService customUserLoginService,
                        CustomLoginSuccessHandler customLoginSuccessHandler) {
                this.customUserLoginService = customUserLoginService;
                this.customLoginSuccessHandler = customLoginSuccessHandler;
        }

        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(req -> req.requestMatchers(HttpMethod.GET, "/main/loggedout")
                                                .permitAll()
                                                // Request matcher for AWS ELB Health Check
                                                .requestMatchers(HttpMethod.GET, "/actuator/health").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/").permitAll()

                                                .requestMatchers(HttpMethod.GET, "/login/oauth2/code/google")
                                                .permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/login/oauth2/code/google")
                                                .permitAll()
                                                // Request matchers for the /rooms endpoint.
                                                .requestMatchers(HttpMethod.GET, "/api/rooms").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/rooms/availability").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/api/rooms").permitAll()
                                                .requestMatchers(HttpMethod.PUT, "/api/rooms").hasAnyRole("ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/api/rooms").hasAnyRole("ADMIN")

                                                // Request matchers for the /room-descriptions endpoint.
                                                .requestMatchers(HttpMethod.GET, "/api/room-descriptions/**")
                                                .permitAll()
                                                .requestMatchers(HttpMethod.POST, "/api/room-descriptions")
                                                .hasAnyRole("ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/api/room-descriptions")
                                                .hasAnyRole("ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/api/room-descriptions")
                                                .hasAnyRole("ADMIN")

                                                .requestMatchers(HttpMethod.GET, "/api/users/**").permitAll()
                                                // Allows all GET method requests to the /users endpoint.

                                                .requestMatchers(HttpMethod.GET, "/api/users/**").permitAll()
                                                .requestMatchers(HttpMethod.PUT, "/api/users/**").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/api/users")
                                                .hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.POST, "/api/users/**")
                                                .hasRole("ADMIN")
                                                // All POST requests to the /Users endpoint should be made only by a
                                                // user
                                                // with an admin role.
                                                // This is because only admins should be able to create a new User.

                                                .requestMatchers(HttpMethod.POST, "/api/checkout/**").permitAll()

                                                .requestMatchers(HttpMethod.GET, "/api/booking").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/api/booking").permitAll()

                                                .anyRequest().authenticated())

                                .oauth2Login(oauth2 -> oauth2
                                                .userInfoEndpoint(userInfo -> userInfo
                                                                .oidcUserService(customUserLoginService))
                                                .successHandler(customLoginSuccessHandler)
                                                .failureUrl("https://d2o1ljsv02tivy.cloudfront.net/login/error"))

                                .logout(logout -> logout
                                                .logoutUrl("/logout")
                                                .invalidateHttpSession(true)
                                                .clearAuthentication(true)
                                                .deleteCookies("JSESSIONID")
                                                .logoutSuccessHandler((req, res, auth) -> {
                                                        res.setStatus(200);
                                                }))

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
                                                        String message = accessDeniedException.getMessage();
                                                        response.getWriter().write("{\"error\": \"" + message + "\"}");
                                                }))
                                .cors(cors -> cors.configurationSource(request -> {
                                        CorsConfiguration config = new CorsConfiguration();
                                        config.setAllowedOrigins(List.of("http://localhost:4200",
                                                        "http://thethreebroomsticks.s3-website-us-east-1.amazonaws.com",
                                                        "https://d2o1ljsv02tivy.cloudfront.net"));
                                        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                                        config.setAllowCredentials(true);
                                        config.setAllowedHeaders(List.of("*"));
                                        return config;
                                }));
                return http.build();
        }
}
