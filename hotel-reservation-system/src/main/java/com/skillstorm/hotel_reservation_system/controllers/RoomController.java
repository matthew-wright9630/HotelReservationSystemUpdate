package com.skillstorm.hotel_reservation_system.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hotel_reservation_system.models.Room;
import com.skillstorm.hotel_reservation_system.services.RoomService;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

// Class that controls what traffic goes where for the /rooms endpoint.
@RestController
@RequestMapping("/api/rooms")
@CrossOrigin({ "http://localhost:4200/", "http://thethreebroomsticks.s3-website-us-east-1.amazonaws.com/",
        "https://the-three-broomsticks-maw.s3.us-east-1.amazonaws.com" })
public class RoomController {

    private final RoomService roomService;

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

    // accepts a LocalDate parameter and returns all rooms that are available for
    // that date.
    @GetMapping("/availability")
    public ResponseEntity<List<Room>> getAvailableRooms(@RequestParam LocalDate startDate, LocalDate endDate) {
        try {
            List<Room> rooms = roomService.findAllAvailableRooms(startDate, endDate);
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
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable long id,
            @RequestBody Room room) {
        try {
            Room updatedRoom = roomService.updateRoom(id, room);
            return new ResponseEntity<>(updatedRoom, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Room> deleteRoom(@PathVariable long id) {
        try {
            Room foundRoom = roomService.deleteRoom(id);
            return new ResponseEntity<>(foundRoom, HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }
}
