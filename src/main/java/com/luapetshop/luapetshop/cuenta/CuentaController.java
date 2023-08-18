package com.luapetshop.luapetshop.cuenta;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.luapetshop.luapetshop.venta.VentaController;

@Controller
public class CuentaController {
	private CuentaService cuentaService;
	private MovimientoService movimientoService;
	private static final Logger LOGGER = LoggerFactory.getLogger(VentaController.class);
	
	@Autowired
	public CuentaController(CuentaService cuentaService, MovimientoService movimientoService) {
		this.cuentaService = cuentaService;
		this.movimientoService = movimientoService;
	}
	
	@GetMapping("/caja")
	public String cuenta(Model model) {
		List<Cuenta> cuentas = cuentaService.getCuentas();
		
		model.addAttribute("cuentas", cuentas);
		
		//ganancia total
		Double ganancia_total = cuentaService.getGananciaTotalDelDia();
		if(ganancia_total == null)
			ganancia_total = 0.0;
		model.addAttribute("ganancia_total", ganancia_total);
		
		//fecha apertura/cierre
		LocalDateTime fecha_apertura = cuentaService.getFechaApertura();
		model.addAttribute("fecha_apertura", fecha_apertura);
		
		return "caja";
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
	
	@PostMapping("/caja/cerrar")
    public ResponseEntity<String> cerrarCaja(@RequestBody Map<String, Object> datos) {
        
		//LOGGER.info("recibido POST en /caja/cerrar: " + datos.toString());
		
		try {			
			cuentaService.cerrarCaja(datos);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("caja cerrada exitosamente");
		} catch (Exception e) {
			LOGGER.error("Error al cerrar caja");
			LOGGER.error(e.getMessage());
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cerrar caja");
		}
    }
	
	@PostMapping("/new/movimiento")
    public ResponseEntity<String> HandleNewMovimiento(
    		@RequestBody Map<String, Object> datos) {
        
		LOGGER.info("recibido POST en /new/movimiento: " + datos.toString());
		
		try {			
			cuentaService.createNewMovimiento(datos);
			return ResponseEntity.status(HttpStatus.CREATED).body("Movimiento creado exitosamente");
		} catch (Exception e) {
			LOGGER.error("Error al crear movimiento");
			LOGGER.error(e.getMessage());
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear movimiento");
		}
    }
	
	
}
