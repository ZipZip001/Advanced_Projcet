package com.vti.projectcuoikhoa.entity;


import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.sql.Date;

@Entity
@Transactional
@Table (name ="rank")
public class Rank {

    public Rank() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getVip() {
        return vip;
    }

    public void setVip(String vip) {
        this.vip = vip;
    }


    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }


    @Column (name ="id")
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    public int id;

    @Column (name ="vip", length = 10)
    public String vip;

    @Column (name ="start")
    public Date start;

    @Column (name ="end")
    public Date end;
}
