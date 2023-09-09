package com.vti.projectcuoikhoa.controller;

import com.vti.projectcuoikhoa.entity.Supplier;
import com.vti.projectcuoikhoa.exception.NotFoundException;
import com.vti.projectcuoikhoa.respository.IRepositorySupplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("api/supplier")
public class ControllerSupplier {
    @Autowired
    private IRepositorySupplier iRepositorySupplier;

    @GetMapping
    public List<Supplier> getAllSuppliers(){
        return iRepositorySupplier.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supplier> getSupplierByID(@PathVariable int id){
        Supplier supplier = iRepositorySupplier.findById(id).orElseThrow(() -> new NotFoundException(""));
        return ResponseEntity.ok(supplier);
    }

    @PostMapping("/addsupplier")
    public Supplier createsupplier(@RequestBody Supplier supplier){

        return iRepositorySupplier.save(supplier);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Supplier> updatesupplier(@PathVariable int id, @RequestBody Supplier supplier){
        Supplier updatesupplier = iRepositorySupplier.findById(id).orElseThrow(() -> new NotFoundException(""));

        updatesupplier.setName(supplier.getName());
        updatesupplier.setAddress(supplier.getAddress());

        iRepositorySupplier.save(updatesupplier);

        return ResponseEntity.ok(updatesupplier);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Supplier> deletesupplier(@PathVariable int id){
        Supplier deletesupplier = iRepositorySupplier.findById(id).orElseThrow(() -> new NotFoundException(""));

        iRepositorySupplier.delete(deletesupplier);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
