package com.skillstorm.hotel_reservation_system.services;

import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.models.Booking;
import com.skillstorm.hotel_reservation_system.repositories.BookingRepository;

@Service
public class BookingService {
  private final BookingRepository bookingRepository;

  public BookingService(BookingRepository bookingRepository) {
      this.bookingRepository = bookingRepository;
  }
}
