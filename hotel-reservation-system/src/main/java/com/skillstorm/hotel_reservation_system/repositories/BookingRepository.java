package com.skillstorm.hotel_reservation_system.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.hotel_reservation_system.models.Booking;

import jakarta.transaction.Transactional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    public List<Booking> findAllByEmail(String email);

    @Query("update Booking b set b.deleted = :new_deleted where id = :booking_id")
    @Modifying
    @Transactional
    public int deleteBooking(@Param("booking_id") int id, @Param("new_deleted") boolean active);

    @Query("update Booking b set b.deleted = :new_deleted where id = :booking_id")
    @Modifying
    @Transactional
    public int reactivateBooking(@Param("booking_id") int id, @Param("new_deleted") boolean active);
}
