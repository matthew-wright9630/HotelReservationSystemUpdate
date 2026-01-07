package com.skillstorm.hotel_reservation_system.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.models.Employee;
import com.skillstorm.hotel_reservation_system.repositories.EmployeeRepository;

@Service
public class CustomEmployeeLoginService extends DefaultOAuth2UserService {
    private final EmployeeRepository employeeRepository;

    public CustomEmployeeLoginService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User user = super.loadUser(userRequest);
        String email = user.getAttribute("email");

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        Employee employee = employeeRepository.findByEmail(email);
        if (employee.getId() > 0) {
            // Assign role from DB
            authorities.add(new SimpleGrantedAuthority("ROLE_" + employee.getRole().name()));
        }
        // Guests get no authorities

        return new DefaultOAuth2User(authorities, user.getAttributes(), "email");
    }
}
