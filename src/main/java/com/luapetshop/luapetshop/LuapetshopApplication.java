package com.luapetshop.luapetshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class LuapetshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(LuapetshopApplication.class, args);
	}

}
