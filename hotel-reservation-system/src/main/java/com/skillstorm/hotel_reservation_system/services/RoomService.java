package com.skillstorm.hotel_reservation_system.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Room findRoomById(long id) {

        Optional<Room> foundRoom = roomRepository.findById((int) id);
        if (foundRoom.isPresent()) {
            return foundRoom.get();
        }
        throw new IllegalArgumentException(
                "Room  does not exist. Please try with another room.");
    }

    public Room createRoom(Room room) {
        if (room == null) {
            throw new IllegalArgumentException("Room does not exist");
        }
        return roomRepository.save(room);
    }

    // Accepts a LocalDate parameter and filters all rooms by if it is available on
    // that particular date.
    // This is useful for filtering by specific days.
    public List<Room> findAllAvailableRooms(LocalDate startDate, LocalDate endDate) {
        List<Room> rooms = findAllRooms();

        List<Room> activeRooms = rooms.stream()
                .filter(room -> room.isDeleted() == false)
                .collect(Collectors.toList());
        // Will need a bookingService to find all rooms that are booked for this date.

        return activeRooms;
    }

    public Room updateRoom(long id, Room room) {
        if (room == null) {
            throw new IllegalArgumentException("Not all fields were input correctly.");
        }
        Room foundRoom = findRoomById(id);
        if (foundRoom.getId() > 0) {
            return roomRepository.save(room);
        }
        throw new IllegalArgumentException("Room does not exist");
    }

    public Room deleteRoom(long id) {
        Room foundRoom = findRoomById(id);
        if (foundRoom.getId() > 0) {
            roomRepository.deleteRoom((int) foundRoom.getId(), true);
            return foundRoom;
        }
        throw new IllegalArgumentException("Room does not exist");
    }
}
