package com.vti.projectcuoikhoa.controller;

import com.vti.projectcuoikhoa.entity.Category;
import com.vti.projectcuoikhoa.exception.NotFoundException;
import com.vti.projectcuoikhoa.respository.IRepositoryCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("api/category")
public class ControllerCategory {

    @Autowired
    private IRepositoryCategory iRepositoryCategory;

    @GetMapping
    List<Category> getAllCategory (){
        return iRepositoryCategory.findAll();
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Category> findCategoryByID (@PathVariable int id){
        Category cart = iRepositoryCategory.findById(id).orElseThrow(() -> new NotFoundException(""));

        return ResponseEntity.ok(cart);
    }

    @PostMapping("/addcategory")
    public Category createcategory(@RequestBody Category category){


        return iRepositoryCategory.save(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updatecategory(@PathVariable int id, @RequestBody Category category){
        Category updatecategory = iRepositoryCategory.findById(id).orElseThrow(() -> new NotFoundException(""));

        updatecategory.setColor(category.getColor());
        updatecategory.setRam(category.getRam());
        updatecategory.setPin(category.getPin());
        updatecategory.setMemorycapacity(category.getMemorycapacity());

        iRepositoryCategory.save(updatecategory);

        return ResponseEntity.ok(updatecategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> deletecategory(@PathVariable int id){
        Category deletecategory = iRepositoryCategory.findById(id).orElseThrow(() -> new NotFoundException(""));

        iRepositoryCategory.delete(deletecategory);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
