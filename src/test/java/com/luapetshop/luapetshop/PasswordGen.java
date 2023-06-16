package com.luapetshop.luapetshop;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGen {

	@Test
	public void generatePassword() {
		BCryptPasswordEncoder passGen = new BCryptPasswordEncoder();
		System.out.println(passGen.encode("admin"));
	}
}
