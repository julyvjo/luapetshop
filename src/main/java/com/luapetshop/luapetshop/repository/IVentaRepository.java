package com.luapetshop.luapetshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luapetshop.luapetshop.venta.Venta;

public interface IVentaRepository extends JpaRepository<Venta, Integer> {

}
