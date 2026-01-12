package com.skillstorm.hotel_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.hotel_reservation_system.models.RoomDescription;

import jakarta.transaction.Transactional;

@Repository
public interface RoomDescriptionRepository extends JpaRepository<RoomDescription, Integer> {

    @Query("update RoomDescription rd set rd.deleted = :new_deleted where id = :room_description_id")
    @Modifying
    @Transactional
    public int deleteRoomDescription(@Param("room_description_id") int id, @Param("new_deleted") boolean active);
}
