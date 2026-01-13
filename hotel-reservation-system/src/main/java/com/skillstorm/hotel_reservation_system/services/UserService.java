package com.skillstorm.hotel_reservation_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.enums.RoleType;
import com.skillstorm.hotel_reservation_system.models.User;
import com.skillstorm.hotel_reservation_system.repositories.UserRepository;

// Service for the User model
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Finds all users and returns them.
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // Finds a specific user by their email address
    public User findUserByEmail(String email) {
        User foundUser = userRepository.findByEmail(email);
        if (foundUser != null) {
            return foundUser;
        }
        throw new IllegalArgumentException("User does not exist");
    }

    // The below create new users and assigns them the applicable roles.
    // Any provided roles are overriden to better handle security.

    // Creates a new guest user.
    public User createUser(User user) {
        if (user != null) {
            user.setRole(RoleType.guest);
            return userRepository.save(user);
        }
        throw new IllegalArgumentException("Attributes have not been provided in the correct manner.");
    }

    public User updateUser(long id, User user) {
        if (user == null) {
            throw new IllegalArgumentException("Not all fields were input correctly.");
        }
        Optional<User> foundUser = userRepository.findById((int) id);
        if (foundUser.isPresent()) {
            user.setOnboardingComplete(true);
            return userRepository.save(user);
        }
        throw new IllegalArgumentException("User does not exist");
    }

    // Creates a new manager user
    public User createManager(User user) {
        if (user != null) {
            user.setRole(RoleType.manager);
            return userRepository.save(user);
        }
        throw new IllegalArgumentException("Attributes have not been provided in the correct manner.");
    }

    // Creates a new admin user
    public User createAdmin(User user) {
        if (user != null) {
            user.setRole(RoleType.admin);
            return userRepository.save(user);
        }
        throw new IllegalArgumentException("Attributes have not been provided in the correct manner.");
    }
}
