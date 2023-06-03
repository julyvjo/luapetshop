package com.luapetshop.luapetshop.proveedor;

import com.luapetshop.luapetshop.producto.Producto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="producto_proveedor")
public class ProductoProveedor {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_producto_proveedor;
	@OneToOne
	@JoinColumn(name = "id_proveedor")
	private Proveedor proveedor;
	@OneToOne
	@JoinColumn(name = "id_producto")
	private Producto producto;
	private double precio_compra;
	
	public ProductoProveedor() {
		super();
	}
	
	public ProductoProveedor(int id_producto_proveedor, Proveedor proveedor, Producto producto, double precio_compra) {
		super();
		this.id_producto_proveedor = id_producto_proveedor;
		this.proveedor = proveedor;
		this.producto = producto;
		this.precio_compra = precio_compra;
	}

	public ProductoProveedor(Proveedor proveedor, Producto producto, double precio_compra) {
		super();
		this.proveedor = proveedor;
		this.producto = producto;
		this.precio_compra = precio_compra;
	}

	public int getId_producto_proveedor() {
		return id_producto_proveedor;
	}

	public void setId_producto_proveedor(int id_producto_proveedor) {
		this.id_producto_proveedor = id_producto_proveedor;
	}

	public Proveedor getProveedor() {
		return proveedor;
	}

	public void setProveedor(Proveedor proveedor) {
		this.proveedor = proveedor;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public double getPrecio_compra() {
		return precio_compra;
	}

	public void setPrecio_compra(double precio_compra) {
		this.precio_compra = precio_compra;
	}

	
	
	
	
}
