package com.luapetshop.luapetshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.luapetshop.luapetshop.compra.Compra;

public interface ICompraRepository extends JpaRepository<Compra, Integer> {

	@Query(value = "SELECT * FROM compra"
			+ " WHERE fecha >= (SELECT fecha_apertura FROM cuenta limit 1)"
			+ " ORDER BY fecha desc", nativeQuery = true)
	List<Compra> findTodayPurchases();


}
