package com.luapetshop.luapetshop.cuenta;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.repository.ICuentaRepository;

import jakarta.transaction.Transactional;

@Service
public class CuentaService {
	private ICuentaRepository cuentaRepository;
	
	@Autowired
	public CuentaService(ICuentaRepository cuentaRepository) {
		this.cuentaRepository = cuentaRepository;
	}
	
	public List<Cuenta> getCuentas() {
		return cuentaRepository.findAll();
	}
	
	public Optional<Cuenta> getCuenta(int id){
		return cuentaRepository.findById(id);
	}

	@Transactional
	public void cerrarCaja(Map<String, Object> datos) {
		//parsear datos
		LocalDateTime fecha_apertura = LocalDateTime.now();
		
		List<Cuenta> cuentas = this.getCuentas();
		for(Cuenta cuenta : cuentas) {
			cuenta.setFecha_apertura(fecha_apertura);
			cuenta.setActualizado(fecha_apertura);
			cuenta.setSaldo_inicial(cuenta.getSaldo());
			cuentaRepository.save(cuenta);
		}
		
	}
}
