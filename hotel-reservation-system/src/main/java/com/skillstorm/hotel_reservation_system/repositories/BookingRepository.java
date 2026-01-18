package com.skillstorm.hotel_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.hotel_reservation_system.models.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{
  
}
