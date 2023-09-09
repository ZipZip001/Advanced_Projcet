package com.vti.projectcuoikhoa.controller;

import com.vti.projectcuoikhoa.entity.Voucher;
import com.vti.projectcuoikhoa.exception.NotFoundException;
import com.vti.projectcuoikhoa.respository.IRepositoryVoucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("api/voucher")
public class ControllerVoucher {

    @Autowired
    private IRepositoryVoucher iRepositoryVoucher;

    @GetMapping
    List<Voucher> getAllVoucher (){
        return iRepositoryVoucher.findAll();
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Voucher> findVoucherByID (@PathVariable int id){
        Voucher voucher = iRepositoryVoucher.findById(id).orElseThrow(() -> new NotFoundException(""));

        return ResponseEntity.ok(voucher);
    }

    @PostMapping("/addvoucher")
    public Voucher createvoucher(@RequestBody Voucher voucher){

        return iRepositoryVoucher.save(voucher);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Voucher> updatevoucher(@PathVariable int id, @RequestBody Voucher voucher){
        Voucher updatevoucher = iRepositoryVoucher.findById(id).orElseThrow(() -> new NotFoundException(""));

        updatevoucher.setVouchercode(voucher.getVouchercode());
        updatevoucher.setStartvoucher(voucher.getStartvoucher());
        updatevoucher.setEndvoucher(voucher.getEndvoucher());
        updatevoucher.setVouchervip1(voucher.getVouchervip1());
        updatevoucher.setVouchervip2(voucher.getVouchervip2());
        updatevoucher.setVouchervip3(voucher.getVouchervip3());

        iRepositoryVoucher.save(updatevoucher);

        return ResponseEntity.ok(updatevoucher);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Voucher> deletevoucher(@PathVariable int id){
        Voucher deletevoucher = iRepositoryVoucher.findById(id).orElseThrow(() -> new NotFoundException(""));

        iRepositoryVoucher.delete(deletevoucher);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
