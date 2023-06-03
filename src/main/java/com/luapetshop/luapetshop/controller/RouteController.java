package com.luapetshop.luapetshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RouteController {

	@GetMapping("/")
	public String index() {
		return "index";
	}
	
	@GetMapping("/venta")
	public String venta() {
		return "venta";
	}
	
	@GetMapping("/compra")
	public String compra() {
		return "compra";
	}
	
	@GetMapping("/caja")
	public String caja() {
		return "caja";
	}

	@GetMapping("/usuario")
	public String usuario() {
		return "usuario";
	}
}
