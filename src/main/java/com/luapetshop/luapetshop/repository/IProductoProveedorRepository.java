package com.luapetshop.luapetshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.luapetshop.luapetshop.proveedor.ProductoProveedor;

public interface IProductoProveedorRepository extends JpaRepository<ProductoProveedor, Integer> {

	@Query("SELECT pp FROM ProductoProveedor pp ORDER BY pp.producto")
    List<ProductoProveedor> findAllOrderByProducto();
}
