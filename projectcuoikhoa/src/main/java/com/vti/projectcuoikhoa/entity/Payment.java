package com.vti.projectcuoikhoa.entity;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.sql.Time;


@Entity
@Transactional
@Table (name ="payment")
public class Payment {

    public Payment() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCreatebyid() {
        return createbyid;
    }

    public void setCreatebyid(int createbyid) {
        this.createbyid = createbyid;
    }

    public Time getCreateat() {
        return createat;
    }

    public void setCreateat(Time createat) {
        this.createat = createat;
    }

    public double getTotalpayment() {
        return totalpayment;
    }

    public void setTotalpayment(double totalpayment) {
        this.totalpayment = totalpayment;
    }

    @Column (name ="id")
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    public int id;

    @Column (name ="createbyid")
    public int createbyid;

    @Column (name ="createat")
    public Time createat;

    @Column (name ="totalpayment")
    public double totalpayment;
}
