package com.skillstorm.hotel_reservation_system.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/booking")
@CrossOrigin({ "http://localhost:4200/, http://thethreebroomsticks.s3-website-us-east-1.amazonaws.com/" })
public class BookingController {
  
}
