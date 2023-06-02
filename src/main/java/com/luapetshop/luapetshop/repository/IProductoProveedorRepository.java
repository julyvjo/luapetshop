package com.luapetshop.luapetshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.luapetshop.luapetshop.proveedor.ProveedorDTO;

public interface IProductoProveedorRepository extends JpaRepository<ProveedorDTO, Integer> {

	@Query("SELECT new com.luapetshop.luapetshop.proveedor.ProveedorDTO"
			+ "(pp.id_producto_proveedor, pr.nombre, p.nombre, pp.precio_compra) "
			+ "FROM ProductoProveedor pp "
			+ "INNER JOIN proveedor pr ON pp.id_proveedor = pr.id_poveedor"
			+ "INNER JOIN producto p ON pp.id_producto = p.id_producto"
			+ "ORDER BY p.nombre")
    List<ProveedorDTO> findAllProveedorDTO();
}
