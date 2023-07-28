package com.luapetshop.luapetshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RouteController {

	@GetMapping("/")
	public String index() {
		return "index";
	}

	@GetMapping("/usuario")
	public String usuario() {
		return "usuario";
	}
}
