package com.luapetshop.luapetshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luapetshop.luapetshop.cuenta.Movimiento;

public interface IMovimientoRepository extends JpaRepository<Movimiento, Integer> {

}
