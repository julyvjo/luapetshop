package com.luapetshop.luapetshop.venta;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.cuenta.Cuenta;
import com.luapetshop.luapetshop.cuenta.Movimiento;
import com.luapetshop.luapetshop.model.MedioPago;
import com.luapetshop.luapetshop.model.MedioPagoService;
import com.luapetshop.luapetshop.producto.Producto;
import com.luapetshop.luapetshop.producto.ProductoService;
import com.luapetshop.luapetshop.repository.ICuentaRepository;
import com.luapetshop.luapetshop.repository.IMovimientoRepository;
import com.luapetshop.luapetshop.repository.IProductoRepository;
import com.luapetshop.luapetshop.repository.IVentaRepository;

import jakarta.transaction.Transactional;

@Service
public class VentaService {
	private IVentaRepository ventaRepository;
	private IMovimientoRepository movimientoRepository;
	private MedioPagoService medioPagoService;
	private ProductoService productoService;
	private ICuentaRepository cuentaRepository;
	private IProductoRepository productoRepository;
	
	@Autowired
	public VentaService(IVentaRepository ventaRepository, IMovimientoRepository movimientoRepository,
			MedioPagoService medioPagoService, ProductoService productoService, ICuentaRepository cuentaRepository,
			IProductoRepository productoRepository) {
		super();
		this.ventaRepository = ventaRepository;
		this.movimientoRepository = movimientoRepository;
		this.medioPagoService = medioPagoService;
		this.productoService = productoService;
		this.cuentaRepository = cuentaRepository;
		this.productoRepository = productoRepository;
	}
	
	
	public List<Venta> getVentas() {
		return ventaRepository.findAll();
	}


	@Transactional
	public void createNewVenta(Map<String, Object> datos) {
		//parseo de datos
		//mp1 y parcial1
		int id_medio_pago1 = (int) datos.get("id_medio_pago1");
		MedioPago mp1 = medioPagoService.getMedioPago(id_medio_pago1).get();
		double parcial1 = (double) datos.get("parcial1");
		//mp2 y parcial2
		int id_medio_pago2 = (int) datos.get("id_medio_pago2");
		MedioPago mp2 = null;
		if(id_medio_pago2 != 0) {	
			mp2 = medioPagoService.getMedioPago(id_medio_pago2).get();
		}
		double parcial2 = (double) datos.get("parcial2");
		//total
        double total = (double) datos.get("total");
		//generar fecha
		LocalDateTime fecha = LocalDateTime.now();
		
		//crear movimiento 1
		Movimiento movimiento1 = new Movimiento();
			//setear cuenta
			Cuenta cuenta1 = mp1.getCuenta();
			movimiento1.setCuenta(cuenta1);
			//fecha
			movimiento1.setFecha(fecha);
			//monto
			movimiento1.setMonto(parcial1);
			//tipo C = compra
			movimiento1.setTipo('V');
			//save
			movimientoRepository.save(movimiento1);
		
		//crear movimiento 2
		Movimiento movimiento2 = null;
		Cuenta cuenta2 = null;
		if(id_medio_pago2 != 0) {
			//crear movimiento 2
			movimiento2 = new Movimiento();
			//setear cuenta
			cuenta2 = mp2.getCuenta();
			movimiento2.setCuenta(cuenta2);
			//fecha
			movimiento2.setFecha(fecha);
			//monto
			movimiento2.setMonto(parcial2);
			//tipo C = compra
			movimiento2.setTipo('V');
			//save
			movimientoRepository.save(movimiento2);
		}
		
		//crear venta
		Venta venta = new Venta();
		    //fecha
			venta.setFecha(fecha);
			
		    //movimiento1
			venta.setMovimiento1(movimiento1);
		    //id_medio_pago1
			venta.setMedio_pago1(mp1);
		    //parcial1
			venta.setParcial1(parcial1);

			//movimiento2 y medio_pago2
			if(id_medio_pago2 != 0) {
				venta.setMovimiento2(movimiento2);
				venta.setMedio_pago2(mp2);
			}
		    //parcial2
			venta.setParcial2(parcial2);
			
			//total
			venta.setTotal(total);			
		    //estado (C completo, A anulado?)
			venta.setEstado('C');
			//SAVE preventivo para agregar lineas de venta
			ventaRepository.save(venta);
			
	        //setear las lineas de venta
	        List<Map<String, Object>> lines = (List<Map<String, Object>>) datos.get("lineas_venta");
	        for( Map<String, Object> line : lines ) {
	        	LineaVenta linea_venta = new LineaVenta();
	        	
	        	//setear venta
	        	linea_venta.setVenta(venta);
	        	
	        	//setear producto
	        	Producto prod = productoService.getProducto((int)line.get("id_producto")).get();
	        	linea_venta.setProducto(prod);
	        	
	        	//setear cantidad vendida
	        	int cantidad = (int)line.get("cantidad");
	        	linea_venta.setCantidad(cantidad);
	        	
	        	//setear precio
	        	linea_venta.setPrecio_venta((double)line.get("precio_venta"));
	        	
	        	venta.getLineasVenta().add(linea_venta);
	        	
	        	//modificar stock del producto
	        	int stock_actual = prod.getStock();
	        	prod.setStock(stock_actual - cantidad);
	        	//guardar producto
	        	productoRepository.save(prod);
	        }
        
	        //save venta y respectivas lineas
	        ventaRepository.save(venta);
	        
        //modificar saldo de cuenta1
        double saldo1 = cuenta1.getSaldo();
        cuenta1.setSaldo(saldo1 + parcial1);
        cuenta1.setActualizado(fecha);
        cuentaRepository.save(cuenta1);
        
        //modificar saldo de cuenta2
        if(id_medio_pago2 != 0) {
        	double saldo2 = cuenta2.getSaldo();
	        cuenta2.setSaldo(saldo2 + parcial2);
	        cuenta2.setActualizado(fecha);
        	cuentaRepository.save(cuenta2);
        }
	}

}
