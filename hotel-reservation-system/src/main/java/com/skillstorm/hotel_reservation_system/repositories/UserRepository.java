package com.skillstorm.hotel_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.hotel_reservation_system.models.User;

//Repository for the User model.
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    public User findByEmail(String email);
}
