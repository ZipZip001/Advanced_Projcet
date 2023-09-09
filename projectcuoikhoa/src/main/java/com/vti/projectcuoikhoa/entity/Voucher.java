package com.vti.projectcuoikhoa.entity;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.Date;


@Entity
@Transactional
@Table (name ="voucher")
public class Voucher {
    public Voucher() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getStartvoucher() {
        return startvoucher;
    }

    public void setStartvoucher(Date startvoucher) {
        this.startvoucher = startvoucher;
    }

    public Date getEndvoucher() {
        return endvoucher;
    }

    public void setEndvoucher(Date endvoucher) {
        this.endvoucher = endvoucher;
    }

    public String getVouchercode() {
        return vouchercode;
    }

    public void setVouchercode(String vouchercode) {
        this.vouchercode = vouchercode;
    }

    public String getVouchervip1() {
        return vouchervip1;
    }

    public void setVouchervip1(String vouchervip1) {
        this.vouchervip1 = vouchervip1;
    }

    public String getVouchervip2() {
        return Vouchervip2;
    }

    public void setVouchervip2(String vouchervip2) {
        Vouchervip2 = vouchervip2;
    }

    public String getVouchervip3() {
        return Vouchervip3;
    }

    public void setVouchervip3(String vouchervip3) {
        Vouchervip3 = vouchervip3;
    }

    @Column (name ="id")
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    public int id;

    @Column (name="startvoucher")
    public Date startvoucher;

    @Column (name ="endvoucher")
    public Date endvoucher;

    @Column (name ="vouchercode", length = 20)
    public String vouchercode;

    @Column (name ="vouchervip1", length = 20)
    public String vouchervip1;

    @Column (name ="vouchervip2", length = 20)
    public String Vouchervip2;

    @Column (name ="vouchervip3", length = 20)
    public String Vouchervip3;
}
