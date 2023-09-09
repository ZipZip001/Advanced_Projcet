package com.vti.projectcuoikhoa.respository;

import com.vti.projectcuoikhoa.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRepositoryPayment extends JpaRepository<Payment,Integer> {
}
