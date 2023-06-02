package com.luapetshop.luapetshop.cuenta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CuentaController {
	private CuentaService cuentaService;
	
	@Autowired
	public CuentaController(CuentaService cuentaService) {
		this.cuentaService = cuentaService;
	}
	
	@GetMapping("/cuenta")
	public String cuenta(Model model) {
		List<Cuenta> cuentas = cuentaService.getCuentas();
		
		model.addAttribute("cuentas", cuentas);
		return "cuenta";
	}
	
	
}
