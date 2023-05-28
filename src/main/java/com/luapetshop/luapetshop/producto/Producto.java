package com.luapetshop.luapetshop.producto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="producto")
public class Producto {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_producto;
	private int id_categoria ;
	private String nombre;
	private String imagen;
	private String descripcion;
	private double precio_compra;
	private double rentabilidad;
	private double ganancia;
	private int stock;
	
	public Producto() {
		super();
	}

	public Producto(int id_producto, int id_categoria, String nombre, String imagen, String descripcion,
			double precio_compra, double rentabilidad, double ganancia, int stock) {
		super();
		this.id_producto = id_producto;
		this.id_categoria = id_categoria;
		this.nombre = nombre;
		this.imagen = imagen;
		this.descripcion = descripcion;
		this.precio_compra = precio_compra;
		this.rentabilidad = rentabilidad;
		this.ganancia = ganancia;
		this.stock = stock;
	}

	public Producto(int id_categoria, String nombre, String imagen, String descripcion, double precio_compra,
			double rentabilidad, double ganancia, int stock) {
		super();
		this.id_categoria = id_categoria;
		this.nombre = nombre;
		this.imagen = imagen;
		this.descripcion = descripcion;
		this.precio_compra = precio_compra;
		this.rentabilidad = rentabilidad;
		this.ganancia = ganancia;
		this.stock = stock;
	}

	public int getId_producto() {
		return id_producto;
	}

	public void setId_producto(int id_producto) {
		this.id_producto = id_producto;
	}

	public int getId_categoria() {
		return id_categoria;
	}

	public void setId_categoria(int id_categoria) {
		this.id_categoria = id_categoria;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public double getPrecio_compra() {
		return precio_compra;
	}

	public void setPrecio_compra(double precio_compra) {
		this.precio_compra = precio_compra;
	}

	public double getRentabilidad() {
		return rentabilidad;
	}

	public void setRentabilidad(double rentabilidad) {
		this.rentabilidad = rentabilidad;
	}

	public double getGanancia() {
		return ganancia;
	}

	public void setGanancia(double ganancia) {
		this.ganancia = ganancia;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}
	
	
  
}
