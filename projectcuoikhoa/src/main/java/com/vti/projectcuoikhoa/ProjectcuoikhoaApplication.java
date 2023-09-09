package com.vti.projectcuoikhoa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000") // Đặt địa chỉ của trang web của bạn
@RestController
@SpringBootApplication
public class ProjectcuoikhoaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectcuoikhoaApplication.class, args);
	}

}
