package com.luapetshop.luapetshop.venta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.repository.IVentaRepository;

@Service
public class VentaService {
	private IVentaRepository ventaRepository;
	
	@Autowired
	public VentaService(IVentaRepository ventaRepository) {
		this.ventaRepository = ventaRepository;
	}
	
	public List<Venta> getVentas() {
		return ventaRepository.findAll();
	}

}
