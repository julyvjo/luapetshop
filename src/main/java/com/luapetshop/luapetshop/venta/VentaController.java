package com.luapetshop.luapetshop.venta;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class VentaController {
	private VentaService ventaService;
	
	@Autowired
	public VentaController(VentaService compraService) {
		this.ventaService = ventaService;
	}
	
	
	@GetMapping("/venta")
	public String venta(
			Model model, 
			@RequestParam Map<String, Object> params) {
		
		
		//model.addAttribute("ventas", ventas);
		
		return "venta";
	}
	
	
}
