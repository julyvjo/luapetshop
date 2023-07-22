package com.luapetshop.luapetshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.luapetshop.luapetshop.cuenta.Movimiento;

public interface IMovimientoRepository extends JpaRepository<Movimiento, Integer> {

	@Query(value = "SELECT * FROM movimiento where id_cuenta = ?1 AND"
			+ " fecha >= (SELECT fecha_apertura FROM cuenta WHERE id_cuenta = ?1)"
			+ " ORDER BY fecha desc", nativeQuery = true)
	public List<Movimiento> findAllByCuentaAndDate(int id);
}
