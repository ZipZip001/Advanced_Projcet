package com.vti.projectcuoikhoa.entity;


import jakarta.persistence.*;
import jakarta.transaction.Transactional;

@Entity
@Transactional
@Table (name ="brand")
public class Brand {

    public Brand() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Column(name ="id")
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    public int id;

    @Column (name = "brand", length = 50, nullable = false)
    public String brand;

}
