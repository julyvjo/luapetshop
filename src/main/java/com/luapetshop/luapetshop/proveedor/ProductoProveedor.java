package com.luapetshop.luapetshop.proveedor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="producto_proveedor")
public class ProductoProveedor {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_producto_proveedor;
	private int id_proveedor;
	private int id_producto;
	private double precio_compra;
	
	public ProductoProveedor() {
		super();
	}

	public ProductoProveedor(int id_proveedor, int id_producto, double precio_compra) {
		super();
		this.id_proveedor = id_proveedor;
		this.id_producto = id_producto;
		this.precio_compra = precio_compra;
	}

	public ProductoProveedor(int id_producto_proveedor, int id_proveedor, int id_producto, double precio_compra) {
		super();
		this.id_producto_proveedor = id_producto_proveedor;
		this.id_proveedor = id_proveedor;
		this.id_producto = id_producto;
		this.precio_compra = precio_compra;
	}

	public int getId_producto_proveedor() {
		return id_producto_proveedor;
	}

	public void setId_producto_proveedor(int id_producto_proveedor) {
		this.id_producto_proveedor = id_producto_proveedor;
	}

	public int getId_proveedor() {
		return id_proveedor;
	}

	public void setId_proveedor(int id_proveedor) {
		this.id_proveedor = id_proveedor;
	}

	public int getId_producto() {
		return id_producto;
	}

	public void setId_producto(int id_producto) {
		this.id_producto = id_producto;
	}

	public double getPrecio_compra() {
		return precio_compra;
	}

	public void setPrecio_compra(double precio_compra) {
		this.precio_compra = precio_compra;
	}
	
	
	
}
