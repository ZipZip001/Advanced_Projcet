package com.vti.projectcuoikhoa.respository;

import com.vti.projectcuoikhoa.entity.Cart;
import com.vti.projectcuoikhoa.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRepositoryCategory extends JpaRepository<Category, Integer> {
}
