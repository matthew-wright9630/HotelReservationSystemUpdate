package com.skillstorm.hotel_reservation_system.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hotel_reservation_system.models.RoomDescription;
import com.skillstorm.hotel_reservation_system.services.RoomDescriptionService;

// Controller for handling traffic to the room-descriptions endpoint
@RestController
@RequestMapping("/room-descriptions")
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
