package com.luapetshop.luapetshop.producto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProductoController {
	private ProductoService productoService;
	
	@Autowired
	public ProductoController(ProductoService productoService) {
		this.productoService = productoService;
	}
	
	@GetMapping("/producto")
	public String producto(Model model) {
		List<Producto> productos = productoService.getProductos();
		
		model.addAttribute("productos", productos);
		return "producto";
	}
	
	
}
