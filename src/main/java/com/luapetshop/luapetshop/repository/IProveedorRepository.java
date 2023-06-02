package com.luapetshop.luapetshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luapetshop.luapetshop.producto.Producto;
import com.luapetshop.luapetshop.proveedor.Proveedor;

public interface IProveedorRepository extends JpaRepository<Proveedor, Integer> {

}
