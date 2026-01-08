package com.skillstorm.hotel_reservation_system.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.models.Room;
import com.skillstorm.hotel_reservation_system.models.RoomDescription;
import com.skillstorm.hotel_reservation_system.repositories.RoomDescriptionRepository;

@Service
public class RoomDescriptionService {

    private final RoomDescriptionRepository roomDescriptionRepository;
    private final RoomService roomService;

    public RoomDescriptionService(RoomDescriptionRepository roomDescriptionRepository, RoomService roomService) {
        this.roomDescriptionRepository = roomDescriptionRepository;
        this.roomService = roomService;
    }

    // Finds all rooms and returns them.
    public List<RoomDescription> findAllRooms() {
        return roomDescriptionRepository.findAll();
    }

    public Optional<RoomDescription> findRoomDescriptionById(long id) {
        return roomDescriptionRepository.findById((int) id);
    }

    public List<RoomDescription> findAllAvailableRoomDescriptions(LocalDate date) {

        List<Room> foundRooms = roomService.findAllAvailableRooms(date);

        List<RoomDescription> roomDescriptions = new ArrayList<>();

        for (Room room : foundRooms) {
            if (!roomDescriptions.contains(room.getRoomDescription())) {
                roomDescriptions.add(room.getRoomDescription());
            }
        }

        return roomDescriptions;
    }

    public boolean findAvailableRoomDescription(long id, LocalDate date) {

        return roomService.findAllAvailableRooms(date).stream()
                .map(Room::getRoomDescription)
                .anyMatch(rd -> rd.getId() == id);
    }

    // Saves a room to the database and returns the newly created room.
    public RoomDescription createRoomDescription(RoomDescription roomDescription) {
        return roomDescriptionRepository.save(roomDescription);
    }
}
