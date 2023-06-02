package com.luapetshop.luapetshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luapetshop.luapetshop.producto.Producto;

public interface IProductoRepository extends JpaRepository<Producto, Integer> {

}
