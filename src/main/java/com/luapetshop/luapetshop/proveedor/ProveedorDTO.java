package com.luapetshop.luapetshop.proveedor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
public class ProveedorDTO {
	private int id_producto_proveedor;
	private int nombre_proveedor;
	private int nombre_producto;
	private double precio_compra;
	
	public ProveedorDTO() {
		super();
	}

	public ProveedorDTO(int id_producto_proveedor, int nombre_proveedor, int nombre_producto, double precio_compra) {
		super();
		this.id_producto_proveedor = id_producto_proveedor;
		this.nombre_proveedor = nombre_proveedor;
		this.nombre_producto = nombre_producto;
		this.precio_compra = precio_compra;
	}

	public ProveedorDTO(int nombre_proveedor, int nombre_producto, double precio_compra) {
		super();
		this.nombre_proveedor = nombre_proveedor;
		this.nombre_producto = nombre_producto;
		this.precio_compra = precio_compra;
	}

	public int getId_producto_proveedor() {
		return id_producto_proveedor;
	}

	public void setId_producto_proveedor(int id_producto_proveedor) {
		this.id_producto_proveedor = id_producto_proveedor;
	}

	public int getNombre_proveedor() {
		return nombre_proveedor;
	}

	public void setNombre_proveedor(int nombre_proveedor) {
		this.nombre_proveedor = nombre_proveedor;
	}

	public int getNombre_producto() {
		return nombre_producto;
	}

	public void setNombre_producto(int nombre_producto) {
		this.nombre_producto = nombre_producto;
	}

	public double getPrecio_compra() {
		return precio_compra;
	}

	public void setPrecio_compra(double precio_compra) {
		this.precio_compra = precio_compra;
	}
	
	
	
}
