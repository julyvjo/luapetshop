package com.luapetshop.luapetshop.compra;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.luapetshop.luapetshop.model.MedioPago;
import com.luapetshop.luapetshop.proveedor.Proveedor;
import com.luapetshop.luapetshop.repository.ICompraRepository;
import com.luapetshop.luapetshop.repository.IMedioPagoRepository;
import com.luapetshop.luapetshop.repository.IProveedorRepository;

import jakarta.transaction.Transactional;

@Service
public class CompraService {
	private ICompraRepository compraRepository;
	private IProveedorRepository proveedorRepository;
	private IMedioPagoRepository medioPagoRepository;
	
	@Autowired
	public CompraService(ICompraRepository compraRepository, IProveedorRepository proveedorRepository,
			IMedioPagoRepository medioPagoRepository) {
		super();
		this.compraRepository = compraRepository;
		this.proveedorRepository = proveedorRepository;
		this.medioPagoRepository = medioPagoRepository;
	}

	public List<Compra> getCompras() {
		return compraRepository.findAll();
	}


	@Transactional
	public void createNewCompra(Map<String, Object> datos) {
		//preparar compra
		Compra compra = new Compra();
		
		//proveedor
		int proveedor_id = (int) datos.get("proveedor_id");
		Optional<Proveedor> proveedor = proveedorRepository.findById(proveedor_id);
		proveedor.get();
		
		compra.setTotal((double)datos.get("total"));
		
		//medio_pago
		int medio_pago_id = (int) datos.get("id_medio_pago");
		Optional<MedioPago> optionalMedioPago = medioPagoRepository.findById(medio_pago_id);
		MedioPago medioPago = optionalMedioPago.get();
		
		//impactar en cuenta
		medioPago.getCuenta(); //<- impactar saldo
		
	}

}
