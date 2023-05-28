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
	
	@GetMapping("/proveedor")
	public String proveedor() {
		return "proveedor";
	}
	
	@GetMapping("/cuenta")
	public String cuenta() {
		return "cuenta";
	}
}
