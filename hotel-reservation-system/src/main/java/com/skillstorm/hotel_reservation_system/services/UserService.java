package com.skillstorm.hotel_reservation_system.services;

import java.util.List;

import org.springframework.stereotype.Service;

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

    // Creates a new user.
    // An user must have ttb@gmail.com in their email address. If it does not,
    // it will be created as a guest.
    public User createUser(User user) {
        if (user.getEmail().contains("ttb@gmail.com")) {
            return userRepository.save(user);
        }
        if (!(user.getRole() == null)) {
            return userRepository.save(user);
        }
        throw new IllegalArgumentException("User does not exist");
    }
}
