package com.skillstorm.hotel_reservation_system.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.models.Room;
import com.skillstorm.hotel_reservation_system.repositories.RoomRepository;

/**
 * Service to connect the Room controller and repositories.
 */
@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // Finds all rooms and returns them.
    public List<Room> findAllRooms() {
        return roomRepository.findAll();
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    // Accepts a LocalDate parameter and filters all rooms by if it is available on
    // that particular date.
    // This is useful for filtering by specific days.
    public List<Room> findAllAvailableRooms(LocalDate date) {
        List<Room> rooms = findAllRooms();

        // Will need a bookingService to find all rooms that are booked for this date.

        return rooms;
    }
}
