package com.luapetshop.luapetshop.compra;

import java.util.HashMap;
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
public class CompraController {
	private CompraService compraService;
    private MedioPagoService medioPagoService;
	
	@Autowired
	public CompraController(CompraService compraService, MedioPagoService medioPagoService) {
		this.compraService = compraService;
        this.medioPagoService = medioPagoService;
	}
	
	
	@GetMapping("/compra")
	public String compra(
			Model model, 
			@RequestParam Map<String, Object> params) {

        List<MedioPago> mediospago = medioPagoService.getMediosPago();
		model.addAttribute("mediospago", mediospago);
		
		return "compra";
	}
	
	@GetMapping("/compra/historial")
	public String compraHistorial(Model model) {
		
		List<Compra> compras = compraService.getComprasDelDia();
		model.addAttribute("compras", compras);

		return "compra_historial";
	}
	
	@PostMapping("/new/compra")
    public ResponseEntity<Object> procesarDatos(@RequestBody Map<String, Object> datos) {
		
		try {
			compraService.createNewCompra(datos);
			System.out.println(datos);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("status", "ok");
		
		return ResponseEntity.ok(res);
		//return ResponseEntity.status(HttpStatus.CREATED).body("Compra guardada con exito");
    }
}
