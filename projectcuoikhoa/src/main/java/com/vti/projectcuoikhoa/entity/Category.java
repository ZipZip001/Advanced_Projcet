package com.vti.projectcuoikhoa.entity;


import jakarta.persistence.*;
import jakarta.transaction.Transactional;

@Entity
@Transactional
@Table (name ="category")
public class Category {
    public Category() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getRam() {
        return ram;
    }

    public void setRam(String ram) {
        this.ram = ram;
    }

    public String getMemorycapacity() {
        return memorycapacity;
    }

    public void setMemorycapacity(String memorycapacity) {
        this.memorycapacity = memorycapacity;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    @Column (name = "id")
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    public int id;

    @Column (name ="color", length = 20, nullable = false)
    public String color;

    @Column (name ="ram", length = 20, nullable = false)
    public String ram;

    @Column (name ="memorycapacity", length = 20, nullable = false)
    public String memorycapacity;

    @Column (name ="pin", length = 20, nullable = false)
    public String pin;
}
