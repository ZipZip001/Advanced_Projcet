package com.vti.projectcuoikhoa.controller;


import com.vti.projectcuoikhoa.entity.Payment;
import com.vti.projectcuoikhoa.exception.NotFoundException;
import com.vti.projectcuoikhoa.respository.IRepositoryPayment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/payment")
public class ControllerPayment {

    @Autowired
    private IRepositoryPayment iRepositoryPayment;

    @GetMapping
    List<Payment> getAllPayment (){
        return iRepositoryPayment.findAll();
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Payment> findPaymentByID (@PathVariable int id){
        Payment payment = iRepositoryPayment.findById(id).orElseThrow(() -> new NotFoundException(""));

        return ResponseEntity.ok(payment);
    }

    @PostMapping("/addpayment")
    public Payment createpayment(@RequestBody Payment payment){

        return iRepositoryPayment.save(payment);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Payment> updatepayment(@PathVariable int id, @RequestBody Payment payment){
//        Payment updatepayment = iRepositoryPayment.findById(id).orElseThrow(() -> new NotFoundException(""));
//
//        iRepositoryPayment.save(updatepayment);
//
//        return ResponseEntity.ok(updatepayment);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Payment> deletecart(@PathVariable int id){
        Payment deletepayment = iRepositoryPayment.findById(id).orElseThrow(() -> new NotFoundException(""));

        iRepositoryPayment.delete(deletepayment);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
