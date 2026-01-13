package com.skillstorm.hotel_reservation_system.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.enums.RoleType;
import com.skillstorm.hotel_reservation_system.models.User;
import com.skillstorm.hotel_reservation_system.repositories.UserRepository;

@Service
public class CustomLoginService implements OAuth2UserService<OidcUserRequest, OidcUser> {
    private final UserRepository userRepository;

    public CustomLoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private final OidcUserService delegate = new OidcUserService();

    // Loads the user and provides their level of authority to Oauth2 (guest,
    // manager, or admin).
    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = delegate.loadUser(userRequest);

        String email = oidcUser.getEmail();
        List<GrantedAuthority> authorities = new ArrayList<>();

        User user = userRepository.findByEmail(email);

        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setFirstName(oidcUser.getGivenName());
            if (oidcUser.getFamilyName() != "") {
                user.setLastName(oidcUser.getFamilyName());
            }
            user.setRole(RoleType.guest);
            userRepository.save(user);
        }

        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name().toUpperCase()));

        return new DefaultOidcUser(authorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
    }
}
