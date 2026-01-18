package com.skillstorm.hotel_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.hotel_reservation_system.models.Room;

import jakarta.transaction.Transactional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query("update Room r set r.deleted = :new_deleted where id = :room_id")
    @Modifying
    @Transactional
    public int deleteRoom(@Param("room_id") int id, @Param("new_deleted") boolean deleted);

}
