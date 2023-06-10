package com.luapetshop.luapetshop.venta;

import com.luapetshop.luapetshop.producto.Producto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="linea_venta")
public class LineaVenta {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_linea_venta;
	@ManyToOne
	@JoinColumn(name = "id_venta")
	private Venta venta;
	@ManyToOne
	@JoinColumn(name = "id_producto")
	private Producto producto;
	private double precio_venta;
	private int cantidad;
	
	public LineaVenta() {
		super();
	}

	public LineaVenta(int id_linea_venta, Venta venta, Producto producto, double precio_venta, int cantidad) {
		super();
		this.id_linea_venta = id_linea_venta;
		this.venta = venta;
		this.producto = producto;
		this.precio_venta = precio_venta;
		this.cantidad = cantidad;
	}

	public LineaVenta(Venta venta, Producto producto, double precio_venta, int cantidad) {
		super();
		this.venta = venta;
		this.producto = producto;
		this.precio_venta = precio_venta;
		this.cantidad = cantidad;
	}

	public int getId_linea_venta() {
		return id_linea_venta;
	}

	public void setId_linea_venta(int id_linea_venta) {
		this.id_linea_venta = id_linea_venta;
	}

	public Venta getVenta() {
		return venta;
	}

	public void setVenta(Venta venta) {
		this.venta = venta;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public double getPrecio_venta() {
		return precio_venta;
	}

	public void setPrecio_venta(double precio_venta) {
		this.precio_venta = precio_venta;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	
  
}
