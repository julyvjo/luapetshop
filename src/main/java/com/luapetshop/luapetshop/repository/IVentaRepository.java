package com.luapetshop.luapetshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.luapetshop.luapetshop.venta.Venta;

public interface IVentaRepository extends JpaRepository<Venta, Integer> {

	@Query(value = "SELECT * FROM venta"
			+ " WHERE fecha >= (SELECT fecha_apertura FROM cuenta limit 1)"
			+ " ORDER BY fecha desc", nativeQuery = true)
	List<Venta> findTodaySales();

}
