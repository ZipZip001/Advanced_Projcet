package com.vti.projectcuoikhoa.entity;


import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Entity
@Transactional
@NoArgsConstructor
@Table (name = "account")
public class Account {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @Column (name ="username", length = 20, nullable = false)
    private String username;

    @Column (name ="password", length = 20, nullable = false)
    private String password;

    @Column(name ="email", length = 255)
    private String email;

    @Column(name ="phonenumber", length = 10)
    private String phonenumber;

    @Column(name ="role")
    private String role;

    public Account(int id, String username, String password, String email, String phonenumber, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phonenumber = phonenumber;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String user) {
        this.username = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return id == account.id && Objects.equals(username, account.username) && Objects.equals(password, account.password) && Objects.equals(email, account.email) && Objects.equals(phonenumber, account.phonenumber) && Objects.equals(role, account.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, email, phonenumber, role);
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phonenumber='" + phonenumber + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
