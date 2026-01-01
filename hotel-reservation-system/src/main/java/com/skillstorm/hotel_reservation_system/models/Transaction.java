package com.skillstorm.hotel_reservation_system.models;

import com.skillstorm.hotel_reservation_system.enums.PaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {
    
    @Id
    @Column(name = "transaction_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /*
    A transaction can be: 
    'pending', 'authorized','processing','completed','declined','refunded', 'cancelled' 
    */
    @Column(name = "payment_status")
    private PaymentStatus status;

    @Column
    private int payment;

    @Column(name = "transaction_description")
    private String description;
    //e.g. room reservation, room service, spa treatment, gift shop, etc.

    @ManyToOne
    @JoinColumn(name = "payment_info_id")
    private PaymentInfo paymentInfo;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    /* 
    Constructors:
        No-args, All-args except id, All-args 
    */
    public Transaction() {
    }

    public Transaction(PaymentStatus status, int payment, String description, PaymentInfo paymentInfo,
            Booking booking) {
        this.status = status;
        this.payment = payment;
        this.description = description;
        this.paymentInfo = paymentInfo;
        this.booking = booking;
    }

    public Transaction(long id, PaymentStatus status, int payment, String description, PaymentInfo paymentInfo,
            Booking booking) {
        this.id = id;
        this.status = status;
        this.payment = payment;
        this.description = description;
        this.paymentInfo = paymentInfo;
        this.booking = booking;
    }

    // getters, setters, hashcode, equals, toString
   
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public int getPayment() {
        return payment;
    }

    public void setPayment(int payment) {
        this.payment = payment;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public PaymentInfo getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(PaymentInfo paymentInfo) {
        this.paymentInfo = paymentInfo;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        result = prime * result + payment;
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((paymentInfo == null) ? 0 : paymentInfo.hashCode());
        result = prime * result + ((booking == null) ? 0 : booking.hashCode());
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
        Transaction other = (Transaction) obj;
        if (id != other.id)
            return false;
        if (status != other.status)
            return false;
        if (payment != other.payment)
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (paymentInfo == null) {
            if (other.paymentInfo != null)
                return false;
        } else if (!paymentInfo.equals(other.paymentInfo))
            return false;
        if (booking == null) {
            if (other.booking != null)
                return false;
        } else if (!booking.equals(other.booking))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Transaction [id=" + id + ", status=" + status + ", payment=" + payment + ", description=" + description
                + ", paymentInfo=" + paymentInfo + ", booking=" + booking + "]";
    }
}
