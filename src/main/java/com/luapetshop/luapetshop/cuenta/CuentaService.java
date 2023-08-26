package com.luapetshop.luapetshop.cuenta;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.repository.ICuentaRepository;
import com.luapetshop.luapetshop.repository.IMovimientoRepository;

import jakarta.transaction.Transactional;

@Service
public class CuentaService {
	private ICuentaRepository cuentaRepository;
	private IMovimientoRepository movimientoRepository;
	
	@Autowired
	public CuentaService(ICuentaRepository cuentaRepository, IMovimientoRepository movimientoRepository) {
		super();
		this.cuentaRepository = cuentaRepository;
		this.movimientoRepository = movimientoRepository;
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

	@Transactional
	public void createNewMovimiento(Map<String, Object> datos) throws Exception {
		Movimiento movimiento = new Movimiento();
		
//		 id_cuenta, monto, tipo, motivo, fecha
		Integer id_cuenta = (Integer)datos.get("id_cuenta");
		Double monto = Double.valueOf((String)datos.get("monto"));
		Character tipo = (Character)datos.get("tipo");
		if(tipo == 'I' || tipo == 'E') {
			throw new Exception("El tipo " + tipo + " es invalido");
		}
		String motivo = (String)datos.get("motivo");
		LocalDateTime fecha = LocalDateTime.now();
		
		//setear atributos
		Cuenta cuenta = cuentaRepository.findById(id_cuenta).get();
		movimiento.setCuenta(cuenta);
		movimiento.setMonto(monto);
		movimiento.setTipo(tipo);
		movimiento.setMotivo(motivo);
		movimiento.setFecha(fecha);
		
		Double saldo_actual = cuenta.getSaldo();
		if(tipo == 'I') {
			cuenta.setSaldo(saldo_actual + monto);
		}else if(tipo == 'E') {
			cuenta.setSaldo(saldo_actual - monto);
		}
		cuenta.setActualizado(fecha);
		
		movimientoRepository.save(movimiento);
		cuentaRepository.save(cuenta);
	}



	public Double getGananciaTotalDelDia() {
		
		return cuentaRepository.findGananciaTotalDelDia();
	}



	public LocalDateTime getFechaApertura() {
		
		return cuentaRepository.findFechaApertura();
	}
}
