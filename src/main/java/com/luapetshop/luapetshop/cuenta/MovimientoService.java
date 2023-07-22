package com.luapetshop.luapetshop.cuenta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.repository.ICuentaRepository;
import com.luapetshop.luapetshop.repository.IMovimientoRepository;

@Service
public class MovimientoService {
	private IMovimientoRepository movimientoRepository;
	
	@Autowired
	public MovimientoService(IMovimientoRepository movimientoRepository) {
		this.movimientoRepository = movimientoRepository;
	}
	
	public List<Movimiento> getMovimientosOfCuenta(int id){
		return movimientoRepository.findAllByCuentaAndDate(id);
	}
	
}
