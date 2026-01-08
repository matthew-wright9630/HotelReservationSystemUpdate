package com.skillstorm.hotel_reservation_system.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hotel_reservation_system.models.RoomDescription;
import com.skillstorm.hotel_reservation_system.services.RoomDescriptionService;
import org.springframework.web.bind.annotation.RequestParam;

// Controller for handling traffic to the room-descriptions endpoint
@RestController
@RequestMapping("/room-descriptions")
@CrossOrigin({ "http://localhost:4200/" })
public class RoomDescriptionController {

    private RoomDescriptionService roomDescriptionService;

    public RoomDescriptionController(RoomDescriptionService roomDescriptionService) {
        this.roomDescriptionService = roomDescriptionService;
    }

    // Gets all room descriptions
    @GetMapping
    public ResponseEntity<List<RoomDescription>> getRooms() {
        try {
            List<RoomDescription> roomDescriptions = roomDescriptionService.findAllRooms();
            return new ResponseEntity<>(roomDescriptions, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @GetMapping("/availability")
    public ResponseEntity<List<RoomDescription>> getAllAvailableRoomDescriptions(@RequestParam LocalDate date) {
        try {
            List<RoomDescription> roomDescriptions = roomDescriptionService.findAllAvailableRoomDescriptions(date);
            return new ResponseEntity<>(roomDescriptions, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @GetMapping("/room-available")
    public ResponseEntity<Boolean> getAvailableRoomDescription(@RequestParam LocalDate date,
            long roomDescriptionId) {
        try {
            boolean descriptionAvailable = roomDescriptionService.findAvailableRoomDescription(
                    roomDescriptionId,
                    date);
            return new ResponseEntity<>(descriptionAvailable, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    // Creates a room description
    @PostMapping
    public ResponseEntity<RoomDescription> createRoom(@RequestBody RoomDescription roomDescription) {
        try {
            RoomDescription createdRoomDescription = roomDescriptionService.createRoomDescription(roomDescription);
            return new ResponseEntity<>(createdRoomDescription, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }
}
