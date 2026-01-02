package com.skillstorm.hotel_reservation_system.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.models.RoomDescription;
import com.skillstorm.hotel_reservation_system.repositories.RoomDescriptionRepository;

@Service
public class RoomDescriptionService {

    private final RoomDescriptionRepository roomDescriptionRepository;

    public RoomDescriptionService(RoomDescriptionRepository roomDescriptionRepository) {
        this.roomDescriptionRepository = roomDescriptionRepository;
    }

    // Finds all rooms and returns them.
    public List<RoomDescription> findAllRooms() {
        return roomDescriptionRepository.findAll();
    }

    // Saves a room to the database and returns the newly created room.
    public RoomDescription createRoomDescription(RoomDescription roomDescription) {
        return roomDescriptionRepository.save(roomDescription);
    }
}
