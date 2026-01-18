package com.skillstorm.hotel_reservation_system.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hotel_reservation_system.models.RoomDescription;
import com.skillstorm.hotel_reservation_system.services.RoomDescriptionService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

// Controller for handling traffic to the room-descriptions endpoint
@RestController
@RequestMapping("/room-descriptions")
@CrossOrigin({ "http://localhost:4200/", "http://thethreebroomsticks.s3-website-us-east-1.amazonaws.com/" })
public class RoomDescriptionController {

    private RoomDescriptionService roomDescriptionService;

    public RoomDescriptionController(RoomDescriptionService roomDescriptionService) {
        this.roomDescriptionService = roomDescriptionService;
    }

    // Gets all room descriptions
    @GetMapping
    public ResponseEntity<List<RoomDescription>> getRoomDescriptions() {
        try {
            List<RoomDescription> roomDescriptions = roomDescriptionService.findAllRooms();
            return new ResponseEntity<>(roomDescriptions, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @GetMapping("/availability")
    public ResponseEntity<List<RoomDescription>> getAllAvailableRoomDescriptions(@RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        try {
            List<RoomDescription> roomDescriptions = roomDescriptionService.findAllAvailableRoomDescriptions(startDate,
                    endDate);
            return new ResponseEntity<>(roomDescriptions, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @GetMapping("/room-available")
    public ResponseEntity<Boolean> getAvailableRoomDescription(@RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate,
            @RequestParam long roomDescriptionId) {
        try {
            boolean descriptionAvailable = roomDescriptionService.findAvailableRoomDescription(
                    roomDescriptionId,
                    startDate, endDate);
            return new ResponseEntity<>(descriptionAvailable, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    // Creates a room description
    @PostMapping
    public ResponseEntity<RoomDescription> createRoomDescription(@RequestBody RoomDescription roomDescription) {
        try {
            RoomDescription createdRoomDescription = roomDescriptionService.createRoomDescription(roomDescription);
            return new ResponseEntity<>(createdRoomDescription, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomDescription> updateRoomDescription(@PathVariable long id,
            @RequestBody RoomDescription roomDescription) {
        try {
            RoomDescription updatedRoomDescription = roomDescriptionService.updateRoomDescription(id, roomDescription);
            return new ResponseEntity<>(updatedRoomDescription, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RoomDescription> deleteRoomDescription(@PathVariable long id) {
        try {
            RoomDescription foundRoomDescription = roomDescriptionService.deleteRoomDescription(id);
            return new ResponseEntity<>(foundRoomDescription, HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }
}
