package com.luapetshop.luapetshop.cuenta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
