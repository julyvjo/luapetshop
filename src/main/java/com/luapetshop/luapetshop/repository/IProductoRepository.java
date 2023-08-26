package com.luapetshop.luapetshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.luapetshop.luapetshop.producto.Producto;
import com.luapetshop.luapetshop.proveedor.Proveedor;

public interface IProductoRepository extends JpaRepository<Producto, Integer> {

	List<Producto> findByNombreContaining(String nombre);
	
	Page<Producto> findByNombreContaining(String nombre, Pageable pageable);
	
	Page<Producto> findAll(Pageable pageable);

	@Query(value = "SELECT * FROM producto WHERE"
			+ " codigo = ?1 AND"
			+ " id_proveedor = ?2"
			+ " limit 1", nativeQuery = true)
	Optional<Producto> findProductoByCodigoAndProveedor(String codigo, Integer id_proveedor);

}
