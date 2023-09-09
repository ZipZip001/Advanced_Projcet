package com.vti.projectcuoikhoa.controller;

import com.vti.projectcuoikhoa.entity.Brand;
import com.vti.projectcuoikhoa.exception.NotFoundException;
import com.vti.projectcuoikhoa.respository.IRepositoryBrand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/brand")
public class ControllerBrand {

    @Autowired
    private IRepositoryBrand iRepositoryBrand;

    @GetMapping
    public List<Brand> getAllPhones(){
        return iRepositoryBrand.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandByID(@PathVariable int id){
        Brand brand = iRepositoryBrand.findById(id).orElseThrow(() -> new NotFoundException(""));
        return ResponseEntity.ok(brand);
    }

    @PostMapping("/addbrand")
    public Brand createBrand(@RequestBody Brand brand){

        return iRepositoryBrand.save(brand);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brand> updatebrand(@PathVariable int id, @RequestBody Brand brandDetail){
        Brand updatebrand = iRepositoryBrand.findById(id).orElseThrow(() -> new NotFoundException(""));

        updatebrand.setBrand(brandDetail.getBrand());

        iRepositoryBrand.save(updatebrand);

        return ResponseEntity.ok(updatebrand);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Brand> deletebrand(@PathVariable int id){
        Brand deletebrand = iRepositoryBrand.findById(id).orElseThrow(() -> new NotFoundException(""));

        iRepositoryBrand.delete(deletebrand);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
