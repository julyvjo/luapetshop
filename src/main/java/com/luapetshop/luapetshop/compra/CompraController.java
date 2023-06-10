package com.luapetshop.luapetshop.compra;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CompraController {
	private CompraService compraService;
	
	@Autowired
	public CompraController(CompraService compraService) {
		this.compraService = compraService;
	}
	
	
	@GetMapping("/compra")
	public String compra(
			Model model, 
			@RequestParam Map<String, Object> params) {
		
		
		//model.addAttribute("proveedores", proveedores);
		//model.addAttribute("medios_pago", pageProducto.getContent());
		
		return "compra";
	}
	
	
}
