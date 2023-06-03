package com.luapetshop.luapetshop.proveedor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProveedorController {
	private ProductoProveedorService productoProveedorService;
	
	@Autowired
	public ProveedorController(ProductoProveedorService productoProveedorService) {
		this.productoProveedorService = productoProveedorService;
	}
	
	@GetMapping("/proveedor")
	public String proveedor(Model model) {
		List<ProductoProveedor> productosProveedores = productoProveedorService.getProductosProveedores();
		
		model.addAttribute("proveedores", productosProveedores);
		return "proveedor";
	}
	
	
}
