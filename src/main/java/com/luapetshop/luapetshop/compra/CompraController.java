package com.luapetshop.luapetshop.compra;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
		
		
		//model.addAttribute("proveedores", proveedores);
		//model.addAttribute("medios_pago", pageProducto.getContent());

        List<MedioPago> mediospago = medioPagoService.getMediosPago();
		model.addAttribute("mediospago", mediospago);
		
		// System.out.println(mediospago.get(0).getNombre());
		
		return "compra";
	}
}
