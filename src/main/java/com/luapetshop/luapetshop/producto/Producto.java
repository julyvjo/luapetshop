package com.luapetshop.luapetshop.producto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="producto")
public class Producto {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_producto;
	@OneToOne
	@JoinColumn(name = "id_categoria")
	private Categoria categoria;
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

	public Producto(int id_producto, Categoria categoria, String nombre, String imagen, String descripcion,
			double precio_compra, double rentabilidad, double ganancia, int stock) {
		super();
		this.id_producto = id_producto;
		this.categoria = categoria;
		this.nombre = nombre;
		this.imagen = imagen;
		this.descripcion = descripcion;
		this.precio_compra = precio_compra;
		this.rentabilidad = rentabilidad;
		this.ganancia = ganancia;
		this.stock = stock;
	}

	public Producto(Categoria categoria, String nombre, String imagen, String descripcion, double precio_compra,
			double rentabilidad, double ganancia, int stock) {
		super();
		this.categoria = categoria;
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

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
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
