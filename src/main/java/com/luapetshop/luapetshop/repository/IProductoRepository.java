package com.luapetshop.luapetshop.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.luapetshop.luapetshop.producto.Producto;

public interface IProductoRepository extends JpaRepository<Producto, Integer> {

	List<Producto> findByNombreContaining(String nombre);

	
	Page<Producto> findByNombreContaining(String nombre, Pageable pageable);
	
	Page<Producto> findAll(Pageable pageable);

}
