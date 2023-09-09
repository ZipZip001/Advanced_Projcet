package com.vti.projectcuoikhoa.service;

import com.vti.projectcuoikhoa.entity.Account;
import com.vti.projectcuoikhoa.respository.IRepositoryAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ServiceAccount {

    public String role ="";

    @Autowired
    private IRepositoryAccount iRepositoryAccount;

    public ServiceAccount(IRepositoryAccount iRepositoryAccount) {
        this.iRepositoryAccount = iRepositoryAccount;
    }

    public Account  registerAccount (String username, String password, String email, String phonenumber){

        if (username == null || password == null) {
            return null;
        } else {
            Account account = new Account();

            account.setUsername(username);
            account.setPassword(password);
            account.setEmail(email);
            account.setPhonenumber(phonenumber);
            switch (role){
                case "": account.setRole("USER");
                break;
                case "ADMIN": account.setRole("ADMIN");
                break;
            }

            System.out.println("user: " + username + " password: " + password + " email: "+ email);

            return iRepositoryAccount.save(account);

        }
    }

    public Account loginAccountByEmail (String email, String password){

        System.out.println("email: " + email + " password: " + password);

        if(email == null || password == null){
            return null;
        }
        else {
            return iRepositoryAccount.findOneByEmailAndPassword(email,password).orElse(null);
        }

    }

    public Account loginAccountByUser (String username, String password){

        System.out.println("user: " + username + " password: " + password);

        if(username == null || password == null){
            return null;
        }
        else {
            return iRepositoryAccount.findOneByUsernameAndPassword(username, password).orElse(null);
        }
    }

}
