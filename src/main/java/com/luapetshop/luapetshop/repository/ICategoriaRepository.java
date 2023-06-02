package com.luapetshop.luapetshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luapetshop.luapetshop.producto.Producto;

public interface ICategoriaRepository extends JpaRepository<Producto, Integer> {

}
