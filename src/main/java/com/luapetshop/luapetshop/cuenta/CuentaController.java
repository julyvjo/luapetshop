package com.luapetshop.luapetshop.cuenta;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class CuentaController {
	private CuentaService cuentaService;
	private MovimientoService movimientoService;
	
	@Autowired
	public CuentaController(CuentaService cuentaService, MovimientoService movimientoService) {
		this.cuentaService = cuentaService;
		this.movimientoService = movimientoService;
	}
	
	@GetMapping("/cuenta")
	public String cuenta(Model model) {
		List<Cuenta> cuentas = cuentaService.getCuentas();
		
		model.addAttribute("cuentas", cuentas);
		return "cuenta";
	}
	
	
	@GetMapping("/caja/{id}")
	public String cuenta(@PathVariable int id, Model model) {
		
		Optional<Cuenta> optionalCuenta = cuentaService.getCuenta(id);
		
		if(optionalCuenta.isEmpty()) {
			return "el id proporcionado es incorrecto";
		}
		
		Cuenta cuenta = optionalCuenta.get();
		
		List<Movimiento> movimientos = movimientoService.getMovimientosOfCuenta(id);
		
		
		
		model.addAttribute("cuenta", cuenta);
		model.addAttribute("movimientos", movimientos);
		return "cuenta_details";
	}
	
	
}
