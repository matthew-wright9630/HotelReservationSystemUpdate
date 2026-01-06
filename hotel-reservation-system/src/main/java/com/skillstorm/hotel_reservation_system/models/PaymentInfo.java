package com.skillstorm.hotel_reservation_system.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment_info")
public class PaymentInfo {
    
    @Id
    @Column(name = "payment_info_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
}
