package com.luapetshop.luapetshop.producto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProductoController {
	private ProductoService productoService;
	
	@Autowired
	public ProductoController(ProductoService productoService) {
		this.productoService = productoService;
	}
	
	@GetMapping("/producto")
	public String producto(
			Model model, 
			@RequestParam(value = "nombre", required = false) String nombre) {
		
		List<Producto> productos;
		
		if (nombre == null || nombre.isEmpty()) {
			productos = productoService.getProductos();
	    } else {
	    	productos = productoService.getProductosByName(nombre);
	    }
		
		model.addAttribute("productos", productos);
		return "producto";
	}
	
	
}
