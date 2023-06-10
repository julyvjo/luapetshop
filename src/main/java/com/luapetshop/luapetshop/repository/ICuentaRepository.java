package com.luapetshop.luapetshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luapetshop.luapetshop.cuenta.Cuenta;

public interface ICuentaRepository extends JpaRepository<Cuenta, Integer> {

}
