package com.skillstorm.hotel_reservation_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.models.Booking;
import com.skillstorm.hotel_reservation_system.repositories.BookingRepository;

@Service
public class BookingService {
  private final BookingRepository bookingRepository;

  public BookingService(BookingRepository bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  // Finds all bookings and returns them.
  public List<Booking> findAllBookings() {
    return bookingRepository.findAll();
  }

  public Booking createBooking(Booking booking) {
    return bookingRepository.save(booking);
  }

  public Optional<Booking> findBookingsById(long id) {
    return bookingRepository.findById(id);
  }
}
