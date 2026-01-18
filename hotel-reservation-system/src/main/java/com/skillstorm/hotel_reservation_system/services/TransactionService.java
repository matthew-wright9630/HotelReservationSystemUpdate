package com.skillstorm.hotel_reservation_system.services;

import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.repositories.TransactionRepository;

@Service
public class TransactionService {
  
  private final TransactionRepository transactionRepository;

  public TransactionService(TransactionRepository transactionRepository){
    this.transactionRepository = transactionRepository;
  }
}
