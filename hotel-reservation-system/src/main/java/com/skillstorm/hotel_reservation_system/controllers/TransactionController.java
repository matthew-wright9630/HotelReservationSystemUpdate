package com.skillstorm.hotel_reservation_system.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transaction")
@CrossOrigin({ "http://localhost:4200/, http://thethreebroomsticks.s3-website-us-east-1.amazonaws.com/",
        "https://the-three-broomsticks-maw.s3.us-east-1.amazonaws.com/search" })
public class TransactionController {

}
