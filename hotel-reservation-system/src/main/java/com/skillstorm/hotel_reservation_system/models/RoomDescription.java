package com.skillstorm.hotel_reservation_system.models;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.skillstorm.hotel_reservation_system.enums.RoomColors;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

/**
 * The RoomDescription class defines what the type of the hotel room is.
 * This makes it easy to switch while limiting the number of rooms that need to
 * be created in the DB.
 */

@Entity
public class RoomDescription {

    // Primary ID of the RoomDescription.
    @Id
    @Column(name = "room_description_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Limits the values to one of the room colors defined in the RoomColor.java
    // enum.
    // For more details, refer to RoomColor.java in the enums folder.
    @Column(name = "room_colors")
    @Enumerated(EnumType.STRING)
    private RoomColors roomColor;

    // Maximum number of guests allowed in a room description.
    @Column(name = "max_occupancy")
    private int maxOccupancy;

    @Column(name = "is_smoking")
    private boolean isSmoking;

    @Column(name = "ada_compliant")
    private boolean adaCompliant;

    // String value that defines if it is a king bed, 2 queen beds, etc.
    @Column(name = "bed_style")
    private String bedStyle;

    @Column
    private int price;

    @Column
    private String roomImage;

    // One room description can match multiple
    @OneToMany(mappedBy = "roomDescription")
    @JsonIgnore
    private Set<Room> rooms;

    public RoomDescription() {
    }

    public RoomDescription(long id, RoomColors roomColor, int maxOccupancy, boolean isSmoking, boolean adaCompliant,
            String bedStyle, int price, String roomImage) {
        this.id = id;
        this.roomColor = roomColor;
        this.maxOccupancy = maxOccupancy;
        this.isSmoking = isSmoking;
        this.adaCompliant = adaCompliant;
        this.bedStyle = bedStyle;
        this.price = price;
        this.roomImage = roomImage;
    }

    public RoomDescription(RoomColors roomColor, int maxOccupancy, boolean isSmoking, boolean adaCompliant,
            String bedStyle, int price, String roomImage) {
        this.roomColor = roomColor;
        this.maxOccupancy = maxOccupancy;
        this.isSmoking = isSmoking;
        this.adaCompliant = adaCompliant;
        this.bedStyle = bedStyle;
        this.price = price;
        this.roomImage = roomImage;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public RoomColors getRoomColor() {
        return roomColor;
    }

    public void setRoomColor(RoomColors roomColor) {
        this.roomColor = roomColor;
    }

    public int getMaxOccupancy() {
        return maxOccupancy;
    }

    public void setMaxOccupancy(int maxOccupancy) {
        this.maxOccupancy = maxOccupancy;
    }

    public boolean isSmoking() {
        return isSmoking;
    }

    public void setSmoking(boolean isSmoking) {
        this.isSmoking = isSmoking;
    }

    public boolean isAdaCompliant() {
        return adaCompliant;
    }

    public void setAdaCompliant(boolean adaCompliant) {
        this.adaCompliant = adaCompliant;
    }

    public String getBedStyle() {
        return bedStyle;
    }

    public void setBedStyle(String bedStyle) {
        this.bedStyle = bedStyle;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getRoomImage() {
        return roomImage;
    }

    public void setRoomImage(String roomImage) {
        this.roomImage = roomImage;
    }

    public Set<Room> getRooms() {
        return rooms;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((roomColor == null) ? 0 : roomColor.hashCode());
        result = prime * result + maxOccupancy;
        result = prime * result + (isSmoking ? 1231 : 1237);
        result = prime * result + (adaCompliant ? 1231 : 1237);
        result = prime * result + ((bedStyle == null) ? 0 : bedStyle.hashCode());
        result = prime * result + price;
        result = prime * result + ((roomImage == null) ? 0 : roomImage.hashCode());
        result = prime * result + ((rooms == null) ? 0 : rooms.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        RoomDescription other = (RoomDescription) obj;
        if (id != other.id)
            return false;
        if (roomColor != other.roomColor)
            return false;
        if (maxOccupancy != other.maxOccupancy)
            return false;
        if (isSmoking != other.isSmoking)
            return false;
        if (adaCompliant != other.adaCompliant)
            return false;
        if (bedStyle == null) {
            if (other.bedStyle != null)
                return false;
        } else if (!bedStyle.equals(other.bedStyle))
            return false;
        if (price != other.price)
            return false;
        if (roomImage == null) {
            if (other.roomImage != null)
                return false;
        } else if (!roomImage.equals(other.roomImage))
            return false;
        if (rooms == null) {
            if (other.rooms != null)
                return false;
        } else if (!rooms.equals(other.rooms))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "RoomDescription [id=" + id + ", roomColor=" + roomColor + ", maxOccupancy=" + maxOccupancy
                + ", isSmoking=" + isSmoking + ", adaCompliant=" + adaCompliant + ", bedStyle=" + bedStyle + ", price="
                + price + ", roomImage=" + roomImage + "]";
    }

}
