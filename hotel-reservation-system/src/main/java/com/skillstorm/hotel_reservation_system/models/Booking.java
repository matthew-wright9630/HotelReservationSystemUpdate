package com.skillstorm.hotel_reservation_system.models;

import java.time.Instant;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @Column(name = "booking_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "check_in_date")
    private LocalDate checkInDate;

    @Column(name = "check_out_date")
    private LocalDate checkOutDate;

    @Column
    private int price;

    @Column(name = "number_of_guests")
    private byte numberOfGuests;

    @Column(name = "email_on_booking")
    private String email;

    @Column(name = "name_on_booking")
    private String name;

    @Column(name = "phone_on_booking")
    private int phoneNumber;

    @Column(name = "checked_in")
    private boolean checkedIn;

    @Column
    private boolean deleted;

    @ManyToOne
    @JoinColumn(name = "guest_id")
    private User guest;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private User employee;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    /*
     * Constructors:
     * No-args, All-args except id, All-args
     */
    public Booking() {
    }

    public Booking(Instant createdAt, LocalDate checkInDate, LocalDate checkOutDate, int price, byte numberOfGuests,
            String email, String name, int phoneNumber, boolean checkedIn, boolean deleted, User guest, User employee,
            Room room) {
        this.createdAt = createdAt;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.price = price;
        this.numberOfGuests = numberOfGuests;
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.checkedIn = checkedIn;
        this.guest = guest;
        this.employee = employee;
        this.room = room;
        this.deleted = deleted;
    }

    public Booking(long id, Instant createdAt, LocalDate checkInDate, LocalDate checkOutDate, int price,
            byte numberOfGuests, String email, String name, int phoneNumber, boolean checkedIn, boolean deleted,
            User guest,
            User employee,
            Room room) {
        this.id = id;
        this.createdAt = createdAt;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.price = price;
        this.numberOfGuests = numberOfGuests;
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.checkedIn = checkedIn;
        this.guest = guest;
        this.employee = employee;
        this.room = room;
        this.deleted = deleted;
    }

    // getters, setters, hashcode, equals, toString

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public byte getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(byte numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isCheckedIn() {
        return checkedIn;
    }

    public void setCheckedIn(boolean checkedIn) {
        this.checkedIn = checkedIn;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public User getGuestUser() {
        return guest;
    }

    public void setGuestUser(User guest) {
        this.guest = guest;
    }

    public User getEmployeeUser() {
        return employee;
    }

    public void setUser(User employee) {
        this.employee = employee;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((checkInDate == null) ? 0 : checkInDate.hashCode());
        result = prime * result + ((checkOutDate == null) ? 0 : checkOutDate.hashCode());
        result = prime * result + price;
        result = prime * result + numberOfGuests;
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + phoneNumber;
        result = prime * result + (checkedIn ? 1231 : 1237);
        result = prime * result + (deleted ? 1231 : 1237);
        result = prime * result + ((guest == null) ? 0 : guest.hashCode());
        result = prime * result + ((employee == null) ? 0 : employee.hashCode());
        result = prime * result + ((room == null) ? 0 : room.hashCode());
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
        Booking other = (Booking) obj;
        if (id != other.id)
            return false;
        if (createdAt == null) {
            if (other.createdAt != null)
                return false;
        } else if (!createdAt.equals(other.createdAt))
            return false;
        if (checkInDate == null) {
            if (other.checkInDate != null)
                return false;
        } else if (!checkInDate.equals(other.checkInDate))
            return false;
        if (checkOutDate == null) {
            if (other.checkOutDate != null)
                return false;
        } else if (!checkOutDate.equals(other.checkOutDate))
            return false;
        if (price != other.price)
            return false;
        if (numberOfGuests != other.numberOfGuests)
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (phoneNumber != other.phoneNumber)
            return false;
        if (checkedIn != other.checkedIn)
            return false;
        if (deleted != other.deleted)
            return false;
        if (guest == null) {
            if (other.guest != null)
                return false;
        } else if (!guest.equals(other.guest))
            return false;
        if (employee == null) {
            if (other.employee != null)
                return false;
        } else if (!employee.equals(other.employee))
            return false;
        if (room == null) {
            if (other.room != null)
                return false;
        } else if (!room.equals(other.room))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Booking [id=" + id + ", createdAt=" + createdAt + ", checkInDate=" + checkInDate + ", checkOutDate="
                + checkOutDate + ", price=" + price + ", numberOfGuests=" + numberOfGuests + ", email=" + email
                + ", name=" + name + ", phoneNumber=" + phoneNumber + ", checkedIn=" + checkedIn + ", deleted="
                + deleted + ", guest=" + guest + ", employee=" + employee + ", room=" + room + "]";
    }
}
