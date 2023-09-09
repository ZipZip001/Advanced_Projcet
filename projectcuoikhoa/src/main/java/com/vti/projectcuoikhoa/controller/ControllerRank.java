package com.vti.projectcuoikhoa.controller;

import com.vti.projectcuoikhoa.entity.Rank;
import com.vti.projectcuoikhoa.exception.NotFoundException;
import com.vti.projectcuoikhoa.respository.IRepositoryRank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("api/rank")
public class ControllerRank {

    @Autowired
    private IRepositoryRank iRepositoryRank;

    @GetMapping
    List<Rank> getAllRank (){
        return iRepositoryRank.findAll();
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Rank> findPaymentByID (@PathVariable int id){
        Rank rank = iRepositoryRank.findById(id).orElseThrow(() -> new NotFoundException(""));

        return ResponseEntity.ok(rank);
    }

    @PostMapping("/addrank")
    public Rank createrank(@RequestBody Rank rank){

        return iRepositoryRank.save(rank);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rank> updaterank(@PathVariable int id, @RequestBody Rank rank){
        Rank updaterank = iRepositoryRank.findById(id).orElseThrow(() -> new NotFoundException(""));

        updaterank.setStart(rank.getStart());
        updaterank.setEnd(rank.getEnd());
        updaterank.setVip(rank.getVip());

        iRepositoryRank.save(updaterank);

        return ResponseEntity.ok(updaterank);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Rank> deleterank(@PathVariable int id){
        Rank deleterank = iRepositoryRank.findById(id).orElseThrow(() -> new NotFoundException(""));

        iRepositoryRank.delete(deleterank);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
