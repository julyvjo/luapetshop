package com.luapetshop.luapetshop.venta;

import java.util.List;
import java.util.Map;

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
		
		// System.out.println(mediospago.get(0).getNombre());
		
		return "venta";
	}
	
	@PostMapping("/new/venta")
    public ResponseEntity<String> procesarDatos(@RequestBody Map<String, Object> datos) {
        
		System.out.println(datos.toString());
		
		
		try {
			
			ventaService.createNewVenta(datos);
		} catch (Exception e) {
			
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(datos.toString());
        //return ResponseEntity.status(HttpStatus.CREATED).body("Venta guardada");
    }
	
	
}
