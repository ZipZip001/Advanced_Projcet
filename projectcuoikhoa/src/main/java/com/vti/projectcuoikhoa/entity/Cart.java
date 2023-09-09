package com.vti.projectcuoikhoa.entity;


import jakarta.persistence.*;
import jakarta.transaction.Transactional;

@Entity
@Transactional
@Table (name ="cart")
public class Cart {

    public Cart() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPhoneid() {
        return phoneid;
    }

    public void setPhoneid(int phoneid) {
        this.phoneid = phoneid;
    }

    public double getSellprice() {
        return sellprice;
    }

    public void setSellprice(double sellprice) {
        this.sellprice = sellprice;
    }

    public double getCount() {
        return count;
    }

    public void setCount(double count) {
        this.count = count;
    }

    public String getVouchercode() {
        return vouchercode;
    }

    public void setVouchercode(String vouchercode) {
        this.vouchercode = vouchercode;
    }

    public double getSimpletotal() {
        return simpletotal;
    }

    public void setSimpletotal(double simpletotal) {
        this.simpletotal = simpletotal;
    }



    @Column (name ="id")
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    public int id;

    @Column (name ="phoneid")
    public int phoneid;

    @Column (name="sellprice", nullable = false)
    public double sellprice;

    @Column (name ="count", nullable = false)
    public double count;

    @Column (name ="vouchercode")
    public String vouchercode;


    @Column (name="simpletotal")
    public double simpletotal;

}
