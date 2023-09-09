package com.vti.projectcuoikhoa.controller;

import com.vti.projectcuoikhoa.entity.Phone;
import com.vti.projectcuoikhoa.exception.NotFoundException;
import com.vti.projectcuoikhoa.respository.IRepositoryPhone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/phone")
public class ControllerPhone {

    @Autowired
    private IRepositoryPhone iRepositoryPhone;

    @GetMapping
    public List<Phone> getAllPhones(){
        return iRepositoryPhone.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Phone> getPhoneByID(@PathVariable int id){
        Phone phone = iRepositoryPhone.findById(id).orElseThrow(() -> new NotFoundException(""));
        return ResponseEntity.ok(phone);
    }

    @PostMapping("/addphone")
    public Phone createPhone(@RequestBody Phone phone){

        return iRepositoryPhone.save(phone);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Phone> updatePhone(@PathVariable int id, @RequestBody Phone phoneDetail){
        Phone updatephone = iRepositoryPhone.findById(id).orElseThrow(() -> new NotFoundException(""));

        updatephone.setName(phoneDetail.getName());
        updatephone.setBrand(phoneDetail.getBrand());

        iRepositoryPhone.save(updatephone);

        return ResponseEntity.ok(updatephone);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Phone> deletePhone(@PathVariable int id){
        Phone deletephone = iRepositoryPhone.findById(id).orElseThrow(() -> new NotFoundException(""));

        iRepositoryPhone.delete(deletephone);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
