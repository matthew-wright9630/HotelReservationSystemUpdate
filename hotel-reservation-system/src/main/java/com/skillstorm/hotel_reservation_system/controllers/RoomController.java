package com.skillstorm.hotel_reservation_system.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hotel_reservation_system.models.Room;
import com.skillstorm.hotel_reservation_system.services.RoomService;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

// Class that controls what traffic goes where for the /rooms endpoint.
@RestController
@RequestMapping("/rooms")
public class RoomController {

    private RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // Gets all rooms
    @GetMapping
    public ResponseEntity<List<Room>> getRooms() {
        try {
            List<Room> rooms = roomService.findAllRooms();
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    // Creates a new room
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        try {
            Room createdRoom = roomService.createRoom(room);
            return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    // accepts a LocalDate parameter and returns all rooms that are available for
    // that date.
    @GetMapping("/dates")
    public ResponseEntity<List<Room>> getAvailableRooms(@RequestParam LocalDate date) {
        try {
            List<Room> rooms = roomService.findAllAvailableRooms(date);
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

}
