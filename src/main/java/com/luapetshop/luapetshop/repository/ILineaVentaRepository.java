package com.luapetshop.luapetshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luapetshop.luapetshop.venta.LineaVenta;

public interface ILineaVentaRepository extends JpaRepository<LineaVenta, Integer> {

}
