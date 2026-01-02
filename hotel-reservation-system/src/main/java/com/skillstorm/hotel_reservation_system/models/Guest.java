package com.skillstorm.hotel_reservation_system.models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "guest")
public class Guest {
    
    @Id
    @Column(name = "guest_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "home_address")
    private String address;

    @Column(name = "phone_number")
    private int phoneNumber;

    @ManyToMany
    @JoinTable(name = "guest_payment",
        joinColumns=
            @JoinColumn(name="guest_id"),
        inverseJoinColumns=
            @JoinColumn(name="payment_info_id")
    )
    private Set<PaymentInfo> paymentInfo;

    /* 
    Constructors:
        No-args, All-args except id, All-args 
    */
    public Guest() {
    }
    
    public Guest(String email, String firstName, String lastName, String middleName, String address, int phoneNumber,
            Set<PaymentInfo> paymentInfo) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.paymentInfo = paymentInfo;
    }
    
    public Guest(long id, String email, String firstName, String lastName, String middleName, String address,
            int phoneNumber, Set<PaymentInfo> paymentInfo) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.paymentInfo = paymentInfo;
    }

    // getters, setters, hashcode, equals, toString
    
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Set<PaymentInfo> getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(Set<PaymentInfo> paymentInfo) {
        this.paymentInfo = paymentInfo;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
        result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
        result = prime * result + ((middleName == null) ? 0 : middleName.hashCode());
        result = prime * result + ((address == null) ? 0 : address.hashCode());
        result = prime * result + phoneNumber;
        result = prime * result + ((paymentInfo == null) ? 0 : paymentInfo.hashCode());
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
        Guest other = (Guest) obj;
        if (id != other.id)
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (firstName == null) {
            if (other.firstName != null)
                return false;
        } else if (!firstName.equals(other.firstName))
            return false;
        if (lastName == null) {
            if (other.lastName != null)
                return false;
        } else if (!lastName.equals(other.lastName))
            return false;
        if (middleName == null) {
            if (other.middleName != null)
                return false;
        } else if (!middleName.equals(other.middleName))
            return false;
        if (address == null) {
            if (other.address != null)
                return false;
        } else if (!address.equals(other.address))
            return false;
        if (phoneNumber != other.phoneNumber)
            return false;
        if (paymentInfo == null) {
            if (other.paymentInfo != null)
                return false;
        } else if (!paymentInfo.equals(other.paymentInfo))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Guest [id=" + id + ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName
                + ", middleName=" + middleName + ", address=" + address + ", phoneNumber=" + phoneNumber
                + ", paymentInfo=" + paymentInfo + "]";
    }
       
}
