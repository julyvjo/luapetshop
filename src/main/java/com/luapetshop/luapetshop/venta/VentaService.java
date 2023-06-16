package com.luapetshop.luapetshop.venta;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.model.MedioPago;
import com.luapetshop.luapetshop.model.MedioPagoService;
import com.luapetshop.luapetshop.repository.IVentaRepository;

@Service
public class VentaService {
	private IVentaRepository ventaRepository;
	private MedioPagoService medioPagoService;
	
	@Autowired
	public VentaService(IVentaRepository ventaRepository, MedioPagoService medioPagoService) {
		this.ventaRepository = ventaRepository;
		this.medioPagoService = medioPagoService;
	}
	
	public List<Venta> getVentas() {
		return ventaRepository.findAll();
	}

	public void createNewVenta(Map<String, Object> datos) {
		
		Venta venta = map2venta(datos);
		
	}

	private Venta map2venta(Map<String, Object> datos) {
		
		Venta venta = new Venta();
        
		//setear medio de pago a partir de id
		int id_medio_pago = (int) datos.get("id_medio_pago");
		Optional<MedioPago> optional_mp = medioPagoService.getMedioPago(id_medio_pago);
		MedioPago mp = optional_mp.get();
		
		//setear total en venta
        datos.get("total");
        
        //setear las lineas de venta
        List<Map<String, Object>> lines = (List<Map<String, Object>>) datos.get("lineas_venta");
//        venta
        for( Map<String, Object> line : lines ) {
        	
        	
        	line.get("");
        }
        
		return venta;
	}

}
