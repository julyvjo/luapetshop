package com.luapetshop.luapetshop.cuenta;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.repository.ICuentaRepository;

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
}
