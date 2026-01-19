package com.skillstorm.hotel_reservation_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.models.Booking;
import com.skillstorm.hotel_reservation_system.models.User;
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

  public Booking findBookingsById(long id) {
    Optional<Booking> foundBooking = bookingRepository.findById(id);
    if (foundBooking.isPresent()) {
      return foundBooking.get();
    }
    throw new IllegalArgumentException("Booking does not exist");
  }

  public Booking updateBooking(long id, Booking booking) {
    if (booking == null) {
      throw new IllegalArgumentException("Not all fields were input correctly.");
    }
    Booking foundBooking = findBookingsById(id);
    if (foundBooking.getId() > 0) {
      return bookingRepository.save(booking);
    }
    throw new IllegalArgumentException("Booking does not exist");
  }

  public Booking checkinGuest(long id, User employee) {
    Booking foundBooking = findBookingsById(id);
    if (foundBooking.getId() > 0) {
      foundBooking.setCheckedIn(true);
      foundBooking.setUser(employee);
      return bookingRepository.save(foundBooking);
    }
    throw new IllegalArgumentException("Booking does not exist");
  }

  public Booking deleteBooking(long id) {
    Booking foundBooking = findBookingsById(id);
    if (foundBooking.getId() > 0) {
      bookingRepository.deleteBooking((int) foundBooking.getId(), true);
      return foundBooking;
    }
    throw new IllegalArgumentException("Booking does not exist");
  }

  public Booking reactivateBooking(long id) {
    Booking foundBooking = findBookingsById(id);
    if (foundBooking.getId() > 0) {
      bookingRepository.reactivateBooking((int) foundBooking.getId(), false);
      return foundBooking;
    }
    throw new IllegalArgumentException("Room description does not exist");
  }
}
