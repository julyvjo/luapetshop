package com.luapetshop.luapetshop.compra;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.cuenta.Cuenta;
import com.luapetshop.luapetshop.cuenta.Movimiento;
import com.luapetshop.luapetshop.model.MedioPago;
import com.luapetshop.luapetshop.proveedor.Proveedor;
import com.luapetshop.luapetshop.repository.ICompraRepository;
import com.luapetshop.luapetshop.repository.ICuentaRepository;
import com.luapetshop.luapetshop.repository.IMedioPagoRepository;
import com.luapetshop.luapetshop.repository.IMovimientoRepository;
import com.luapetshop.luapetshop.repository.IProveedorRepository;

import jakarta.transaction.Transactional;

@Service
public class CompraService {
	private ICompraRepository compraRepository;
	private IProveedorRepository proveedorRepository;
	private IMedioPagoRepository medioPagoRepository;
	private IMovimientoRepository movimientoRepository;
	private ICuentaRepository cuentaRepository;
	
	@Autowired
	public CompraService(ICompraRepository compraRepository, IProveedorRepository proveedorRepository,
			IMedioPagoRepository medioPagoRepository, IMovimientoRepository movimientoRepository,
			ICuentaRepository cuentaRepository) {
		super();
		this.compraRepository = compraRepository;
		this.proveedorRepository = proveedorRepository;
		this.medioPagoRepository = medioPagoRepository;
		this.movimientoRepository = movimientoRepository;
		this.cuentaRepository = cuentaRepository;
	}	

	public List<Compra> getCompras() {
		return compraRepository.findAll();
	}


	@Transactional
	public void createNewCompra(Map<String, Object> datos) {
		
		//datos -> proveedor
		int proveedor_id = (int) datos.get("id_proveedor");
		Proveedor proveedor = proveedorRepository.findById(proveedor_id).get();
		//datos -> monto
		double monto = (double) datos.get("monto");
		//datos -> medio de pago
		int id_medio_pago = (int) datos.get("id_medio_pago");
		MedioPago mp = medioPagoRepository.findById(id_medio_pago).get();
		
		//generar fecha
		LocalDateTime fecha = LocalDateTime.now();
		
		//crear movimiento
		Movimiento movimiento = new Movimiento();
			//setear cuenta
			Cuenta cuenta = mp.getCuenta();
			movimiento.setCuenta(cuenta);
			//fecha
			movimiento.setFecha(fecha);
			//monto
			movimiento.setMonto(monto);
			//tipo C = compra
			movimiento.setTipo('C');
		
		//preparar compra
		Compra compra = new Compra();
			//fecha
			compra.setFecha(fecha);
			//proveedor
			compra.setProveedor(proveedor);
			//total
			compra.setTotal(monto);
			//medio_pago
			compra.setMedio_pago(mp);
		
		//impactar en cuenta
		double saldoActual = cuenta.getSaldo();
		double saldoNuevo = saldoActual - monto;
		cuenta.setSaldo(saldoNuevo);
		
		//guardar entidades (impacto directo en DB)
		movimientoRepository.save(movimiento);
		compraRepository.save(compra);
		cuentaRepository.save(cuenta);
	}

}
