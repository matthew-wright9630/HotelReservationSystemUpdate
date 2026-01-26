package com.skillstorm.hotel_reservation_system.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hotel_reservation_system.models.Booking;
import com.skillstorm.hotel_reservation_system.services.BookingService;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin({ "http://localhost:4200/", "http://thethreebroomsticks.s3-website-us-east-1.amazonaws.com/",
        "https://the-three-broomsticks-maw.s3.us-east-1.amazonaws.com", "d2o1ljsv02tivy.cloudfront.net" })
public class BookingController {
    private BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getBookings() {
        try {
            List<Booking> bookings = bookingService.findAllBookings();
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @PostMapping
    public ResponseEntity<Booking> createRoom(@RequestBody Booking booking) {
        try {
            Booking createdBooking = bookingService.createBooking(booking);
            return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

}
