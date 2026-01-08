package com.skillstorm.hotel_reservation_system.dtos;

import com.skillstorm.hotel_reservation_system.enums.RoomColors;

public class RoomDescriptionDto {
    private final Long id;
    private final String bedStyle;
    private final boolean adaCompliant;
    private final boolean isSmoking;
    private final String imageUrl;
    private final int maxOccupancy;
    private final double price;
    private final RoomColors roomColors;

    public RoomDescriptionDto(Long id, String bedStyle, boolean adaCompliant, boolean isSmoking, String imageUrl,
            int maxOccupancy,
            double price, RoomColors roomColors) {
        this.id = id;
        this.bedStyle = bedStyle;
        this.adaCompliant = adaCompliant;
        this.isSmoking = isSmoking;
        this.imageUrl = imageUrl;
        this.maxOccupancy = maxOccupancy;
        this.price = price;
        this.roomColors = roomColors;
    }

    public Long getId() {
        return id;
    }

    public String getBedStyle() {
        return bedStyle;
    }

    public boolean isAdaCompliant() {
        return adaCompliant;
    }

    public boolean isSmoking() {
        return isSmoking;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public int getMaxOccupancy() {
        return maxOccupancy;
    }

    public double getPrice() {
        return price;
    }

    public RoomColors getRoomColors() {
        return roomColors;
    }

}