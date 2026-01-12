package com.skillstorm.hotel_reservation_system.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.models.Employee;
import com.skillstorm.hotel_reservation_system.repositories.EmployeeRepository;

@Service
public class CustomEmployeeLoginService implements OAuth2UserService<OidcUserRequest, OidcUser> {
    private final EmployeeRepository employeeRepository;

    public CustomEmployeeLoginService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    private final OidcUserService delegate = new OidcUserService();

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = delegate.loadUser(userRequest);

        String email = oidcUser.getEmail();
        List<GrantedAuthority> authorities = new ArrayList<>();

        Employee employee = employeeRepository.findByEmail(email);
        if (employee != null && employee.getId() > 0) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + employee.getRole().name().toUpperCase()));
        }

        System.out.println("User email: " + email);
        System.out.println("Authorities: " + authorities);

        return new DefaultOidcUser(authorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
    }
}
