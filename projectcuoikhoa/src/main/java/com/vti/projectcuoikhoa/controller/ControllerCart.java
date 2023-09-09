package com.vti.projectcuoikhoa.controller;


import com.vti.projectcuoikhoa.entity.Cart;
import com.vti.projectcuoikhoa.exception.NotFoundException;
import com.vti.projectcuoikhoa.respository.IRepositoryCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/cart")
public class ControllerCart {

    @Autowired
    private IRepositoryCart iRepositoryCart;

    @GetMapping
    List<Cart> getAllCarts (){
        return iRepositoryCart.findAll();
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Cart> findCartByID (@PathVariable int id){
        Cart cart = iRepositoryCart.findById(id).orElseThrow(() -> new NotFoundException(""));

        return ResponseEntity.ok(cart);
    }

    @PostMapping("/addcart")
    public Cart createcart(@RequestBody Cart cart){

        cart.setSimpletotal(cart.count * cart.sellprice);

        return iRepositoryCart.save(cart);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updatecart(@PathVariable int id, @RequestBody Cart cart){
        Cart updatecart = iRepositoryCart.findById(id).orElseThrow(() -> new NotFoundException(""));

        updatecart.setCount(cart.getCount());

        iRepositoryCart.save(updatecart);

        return ResponseEntity.ok(updatecart);
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Cart> deletecart(@PathVariable int id){
//        Cart deletecart = iRepositoryCart.findById(id).orElseThrow(() -> new NotFoundException(""));
//
//        iRepositoryCart.delete(deletecart);
//
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}
