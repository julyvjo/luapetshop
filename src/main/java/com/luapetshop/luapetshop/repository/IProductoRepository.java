package com.luapetshop.luapetshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.luapetshop.luapetshop.producto.Producto;

public interface IProductoRepository extends JpaRepository<Producto, Integer> {

	List<Producto> findByNombreContaining(String nombre);

}
