package com.luapetshop.luapetshop.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.luapetshop.luapetshop.cuenta.Cuenta;

public interface ICuentaRepository extends JpaRepository<Cuenta, Integer> {

	@Query(value = "SELECT SUM(ganancia) FROM venta"
			+ " where fecha >= (SELECT fecha_apertura FROM cuenta ORDER BY fecha_apertura desc limit 1)", nativeQuery = true)
	Double findGananciaTotalDelDia();

	@Query(value = "SELECT max(fecha_apertura) FROM cuenta", nativeQuery = true)
	LocalDateTime findFechaApertura();

}
