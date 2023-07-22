package com.luapetshop.luapetshop.venta;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.luapetshop.luapetshop.model.MedioPago;
import com.luapetshop.luapetshop.model.MedioPagoService;

@Controller
public class VentaController {
	private VentaService ventaService;
	private MedioPagoService medioPagoService;
	private static final Logger LOGGER = LoggerFactory.getLogger(VentaController.class);
	
	@Autowired
	public VentaController(VentaService ventaService, MedioPagoService medioPagoService) {
		this.ventaService = ventaService;
		this.medioPagoService = medioPagoService;
	}
	
	@GetMapping("/venta")
	public String venta(
			Model model, 
			@RequestParam Map<String, Object> params) {
		
		List<MedioPago> mediospago = medioPagoService.getMediosPago();
		model.addAttribute("mediospago", mediospago);
		
		return "venta";
	}
	
	@PostMapping("/new/venta")
    public ResponseEntity<String> procesarDatos(@RequestBody Map<String, Object> datos) {
        
		LOGGER.info("recibido POST en /new/venta: " + datos.toString());
		
		try {			
			ventaService.createNewVenta(datos);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("Venta creada exitosamente");
		} catch (Exception e) {
			LOGGER.error("Error al procesar nueva venta");
			LOGGER.error(e.getMessage());
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar venta");
		}
    }
	
	
}
