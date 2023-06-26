package com.luapetshop.luapetshop.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.luapetshop.luapetshop.proveedor.ProductoProveedor;

public interface IProductoProveedorRepository extends JpaRepository<ProductoProveedor, Integer> {

	@Query("SELECT pp FROM ProductoProveedor pp ORDER BY pp.producto")
    List<ProductoProveedor> findAllOrderByProducto();
	
	
	@Query(
		"SELECT pp "
		+ "FROM ProductoProveedor pp "
		+ "JOIN pp.producto p WHERE p.nombre LIKE %:nombre%")
    Page<ProductoProveedor> findByNombreProductoContaining(@Param("nombre") String nombre, Pageable pageable);
	
//	@Query(value = "SELECT * FROM producto_proveedor pp "
//			+ "INNER JOIN (select idproducto, nombre from producto) as p "
//			+ "ON pp.id_producto = p.id_producto "
//			+ "WHERE nombre LIKE %:nombre%", 
//			countQuery = "select count(*) from producto_proveedor", 
//			nativeQuery = true)
//	Page<ProductoProveedor> findByNombreContaining(String nombre, Pageable pageable);
//	
//	@Query(value = "SELECT * FROM producto_proveedor pp "
//			+ "INNER JOIN (select id_producto, nombre from producto) as p "
//			+ "ON pp.id_producto = p.id_producto ", 
//			countQuery = "select count(*) from producto_proveedor", 
//			nativeQuery = true)
//	Page<ProductoProveedor> findAll(Pageable pageable);
}
