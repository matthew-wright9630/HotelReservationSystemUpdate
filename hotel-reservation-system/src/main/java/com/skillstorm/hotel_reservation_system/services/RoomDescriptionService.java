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

    public RoomDescription findRoomDescriptionById(long id) {

        Optional<RoomDescription> foundRoomDescription = roomDescriptionRepository.findById((int) id);
        if (foundRoomDescription.isPresent()) {
            return foundRoomDescription.get();
        }
        throw new IllegalArgumentException(
                "Room Description does not exist. Please try with another room description.");
    }

    public List<RoomDescription> findAllAvailableRoomDescriptions(LocalDate startDate, LocalDate endDate) {

        List<Room> foundRooms = roomService.findAllAvailableRooms(startDate, endDate);

        List<RoomDescription> roomDescriptions = new ArrayList<>();

        for (Room room : foundRooms) {
            if (!roomDescriptions.contains(room.getRoomDescription()) && !room.getRoomDescription().isDeleted()) {
                roomDescriptions.add(room.getRoomDescription());
            }
        }

        return roomDescriptions;
    }

    public boolean findAvailableRoomDescription(long id, LocalDate startDate, LocalDate endDate) {

        return roomService.findAllAvailableRooms(startDate, endDate).stream()
                .map(Room::getRoomDescription)
                .anyMatch(rd -> rd.getId() == id);
    }

    // Saves a room to the database and returns the newly created room.
    public RoomDescription createRoomDescription(RoomDescription roomDescription) {
        return roomDescriptionRepository.save(roomDescription);
    }

    public RoomDescription updateRoomDescription(RoomDescription roomDescription) {
        RoomDescription foundRoomDescription = findRoomDescriptionById(roomDescription.getId());
        if (foundRoomDescription.getId() > 0) {
            return roomDescriptionRepository.save(roomDescription);
        }
        throw new IllegalArgumentException("Room description does not exist");
    }

    public RoomDescription deleteRoomDescription(long id) {
        RoomDescription foundRoomDescription = findRoomDescriptionById(id);
        if (foundRoomDescription.getId() > 0) {
            roomDescriptionRepository.deleteRoomDescription((int) foundRoomDescription.getId(), true);
            return foundRoomDescription;
        }
        throw new IllegalArgumentException("Room description does not exist");
    }
}
