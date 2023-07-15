package com.luapetshop.luapetshop.venta;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.model.MedioPago;
import com.luapetshop.luapetshop.model.MedioPagoService;
import com.luapetshop.luapetshop.producto.Producto;
import com.luapetshop.luapetshop.producto.ProductoService;
import com.luapetshop.luapetshop.repository.IVentaRepository;

@Service
public class VentaService {
	private IVentaRepository ventaRepository;
	private MedioPagoService medioPagoService;
	private ProductoService productoService;
	
	@Autowired
	public VentaService(IVentaRepository ventaRepository, 
			MedioPagoService medioPagoService,
			ProductoService productoService) {
		this.ventaRepository = ventaRepository;
		this.medioPagoService = medioPagoService;
		this.productoService = productoService;
	}
	
	public List<Venta> getVentas() {
		return ventaRepository.findAll();
	}

	public void createNewVenta(Map<String, Object> datos) {
		
		Venta venta = map2venta(datos);
		
		System.out.println("Venta Mapeada = " + venta.toString());
		
	}

	private Venta map2venta(Map<String, Object> datos) {
		
		Venta venta = new Venta();
        
		System.out.println("map2venta");
		
		//setear fyh
		//venta.setFyh(LocalDateTime.now());
		
		//setear medio de pago a partir de id
		int id_medio_pago = (int) datos.get("id_medio_pago");
		Optional<MedioPago> optional_mp = medioPagoService.getMedioPago(id_medio_pago);
		MedioPago mp = optional_mp.get();
		//venta.setMedio_pago(mp);
		
		//setear total en venta 
        venta.setTotal((Double)datos.get("total"));
        
        //setear las lineas de venta
        List<Map<String, Object>> lines = (List<Map<String, Object>>) datos.get("lineas_venta");
        for( Map<String, Object> line : lines ) {
        	LineaVenta linea_venta = new LineaVenta();
        	
        	//setear producto
        	Optional<Producto> optional_prod = productoService.getProducto((int)line.get("id_producto"));
        	Producto prod = optional_prod.get();
        	linea_venta.setProducto(prod);
        	
        	//setear cantidad vendida
        	linea_venta.setCantidad((int)line.get("cantidad"));
        	
        	//setear precio
        	linea_venta.setPrecio_venta((double)line.get("precio"));
        	
        	venta.getLineasVenta().add(linea_venta);
        }
        
		return venta;
	}

}
