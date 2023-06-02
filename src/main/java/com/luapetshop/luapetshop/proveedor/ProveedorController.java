package com.luapetshop.luapetshop.proveedor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProveedorController {
	private ProveedorService proveedorService;
	
	@Autowired
	public ProveedorController(ProveedorService proveedorService) {
		this.proveedorService = proveedorService;
	}
	
	@GetMapping("/proveedor")
	public String proveedor(Model model) {
		List<ProveedorDTO> proveedoresDTO = proveedorService.getProveedoresDTO();
		
		model.addAttribute("proveedores", proveedoresDTO);
		return "proveedor";
	}
	
	
}
