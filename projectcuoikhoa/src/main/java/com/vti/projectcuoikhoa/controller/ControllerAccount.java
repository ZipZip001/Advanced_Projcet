package com.vti.projectcuoikhoa.controller;


import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.vti.projectcuoikhoa.entity.Account;
import com.vti.projectcuoikhoa.exception.NotFoundException;
import com.vti.projectcuoikhoa.respository.IRepositoryAccount;
import com.vti.projectcuoikhoa.service.JwtService;
import com.vti.projectcuoikhoa.service.ServiceAccount;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin("*")
@RestController
@RequestMapping ("api/auth")
public class ControllerAccount {

    @Autowired
    public IRepositoryAccount iRepositoryAccount;

    @Autowired
    public ServiceAccount serviceAccount;

    @Autowired
    public JwtService jwtService;

    private final static String M_S_G = "";

    @GetMapping
    public List<Account> getAllAccount(){

        return  iRepositoryAccount.findAll();

    }

    @GetMapping ("/{id}")
    public ResponseEntity<Account> getAccountByID(@PathVariable int id){

        Account account  = iRepositoryAccount.findById(id).orElseThrow(() ->  new NotFoundException(""));

        return ResponseEntity.ok(account);
    }

    @GetMapping("/register")
    public String getRegisterpage (Model model){
        model.addAttribute("registerRequest",new Account());

        return "register_page";
    }

    @GetMapping("/login")
    public String getLoginpage (Model model){
        model.addAttribute("loginRequest",new Account());

        return "login_page";
    }


    @PostMapping("/register")
    public String register(@RequestBody Account account){

        Account registerAccount = serviceAccount.registerAccount(account.getUsername(), account.getPassword(), account.getEmail(), account.getPhonenumber());

        System.out.println("register:" + account);

        return registerAccount == null ? "register faile" : "register successfull";
    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<String> login(HttpServletRequest request, @RequestBody Account account, Model model) {
        String result = "";

        String email = account.getEmail();

        String username = account.getUsername();

        System.out.println("login: " + account);

        if(email == null && username != null){
            Account loginAccount1 = serviceAccount.loginAccountByUser(account.getUsername(), account.getPassword());



            JsonObject accountjson = new JsonObject();
            accountjson.addProperty("username", loginAccount1.getUsername());
            accountjson.addProperty("password",loginAccount1.getPassword());
            accountjson.addProperty("email",loginAccount1.getEmail());
            accountjson.addProperty("phonenumber",loginAccount1.getPhonenumber());
            accountjson.addProperty("role",loginAccount1.getRole());

            result = jwtService.generateTokenLogin(account.getUsername());

            JsonObject data = new JsonObject();
            data.addProperty("access_token",result);
            data.add("user",accountjson);

            String jsonData = new Gson().toJson(data);

            System.out.println(jsonData);
            model.addAttribute(loginAccount1.getUsername());
            return ResponseEntity.ok(jsonData);
        }
        else if(username == null && email != null){

            Account loginAccount = serviceAccount.loginAccountByEmail(account.getEmail(), account.getPassword());

            JsonObject accountjson = new JsonObject();
            accountjson.addProperty("username", loginAccount.getUsername());
            accountjson.addProperty("password",loginAccount.getPassword());
            accountjson.addProperty("email",loginAccount.getEmail());
            accountjson.addProperty("phonenumber",loginAccount.getPhonenumber());
            accountjson.addProperty("role",loginAccount.getRole());

            result = jwtService.generateTokenLogin(account.getUsername());

            JsonObject data = new JsonObject();
            data.addProperty("access_token",result);
            data.add("user",accountjson);

            String jsonData = new Gson().toJson(data);

            System.out.println(jsonData);

            model.addAttribute(loginAccount.getUsername());
            return ResponseEntity.ok(jsonData);
        }
        else {
            return null;
        }
    }




//    @PostMapping("/login")
//    public ResponseEntity<Account> login(@RequestBody Account account, Model model){
//
//        String email = account.getEmail();
//
//        String username = account.getUsername();
//
//        System.out.println("login: " + account);
//
//        if(email == null && username != null){
//            Account loginAccount1 = serviceAccount.loginAccountByUser(account.getUsername(), account.getPassword());
//
//            model.addAttribute(loginAccount1.getUsername());
//            return ResponseEntity.ok(loginAccount1);
//        }
//        else if(username == null && email != null){
//
//            Account loginAccount = serviceAccount.loginAccountByEmail(account.getEmail(), account.getPassword());
//
//            model.addAttribute(loginAccount.getUsername());
//            return ResponseEntity.ok(loginAccount);
//        }
//        else {
//            return null;
//        }
//    }


    @PutMapping ("/{id}")
    public ResponseEntity<String> change (@PathVariable int id, @RequestBody Account changeAccount){

        Account change = iRepositoryAccount.findById(id).orElseThrow(() -> new NotFoundException(""));

        String oldphonenumber = change.getPhonenumber();
        String oldpassword = change.getPassword();
        String oldemail = change.getEmail();

        change.setPhonenumber(changeAccount.getPhonenumber());
        change.setPassword(changeAccount.getPassword());
        change.setEmail(changeAccount.getEmail());

        iRepositoryAccount.save(change);

        return ResponseEntity.ok("change: phone number old: " + oldphonenumber
                + "\n phone number new: " + change.getPhonenumber()
                + "\n email old: " + oldemail
                + "\n email new: " + change.getEmail()
                + "\n password old: " + oldpassword
                + "\n password new: " + change.getPassword());

    }

    @RequestMapping (value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteAccount (@PathVariable int id){

        Account deleteAccount = iRepositoryAccount.findById(id).orElseThrow(() -> new NotFoundException(""));

        iRepositoryAccount.deleteById(id);

        return ResponseEntity.ok("Deleted account has id: " + deleteAccount.getId());
    }
}
