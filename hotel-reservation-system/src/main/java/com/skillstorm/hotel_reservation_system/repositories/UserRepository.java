package com.skillstorm.hotel_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.hotel_reservation_system.models.User;

import jakarta.transaction.Transactional;

//Repository for the User model.
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    public User findByEmail(String email);

    @Query("update User u set u.deleted = :new_deleted where id = :user_id")
    @Modifying
    @Transactional
    public int deleteUser(@Param("user_id") int id, @Param("new_deleted") boolean active);

    @Query("update User u set u.deleted = :new_deleted where id = :user_id")
    @Modifying
    @Transactional
    public int reactivateUser(@Param("user_id") int id, @Param("new_deleted") boolean active);
}
