package com.luapetshop.luapetshop.producto;

import com.luapetshop.luapetshop.proveedor.Proveedor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="producto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_producto;
	@OneToOne
	@JoinColumn(name = "id_categoria")
	private Categoria categoria;
	@ManyToOne
	@JoinColumn(name = "id_proveedor")
	private Proveedor proveedor;
	private String nombre;
	private String codigo;
	private String imagen;
	private String descripcion;
	private double precio_compra;
	private double rentabilidad;
	private double ganancia;
	private double precio_venta;
	private int stock;
	public Producto(int id_producto, Categoria categoria, Proveedor proveedor, String nombre, String codigo,
			String imagen, String descripcion, double precio_compra, double rentabilidad, double ganancia,
			double precio_venta, int stock) {
		super();
		this.id_producto = id_producto;
		this.categoria = categoria;
		this.proveedor = proveedor;
		this.nombre = nombre;
		this.codigo = codigo;
		this.imagen = imagen;
		this.descripcion = descripcion;
		this.precio_compra = precio_compra;
		this.rentabilidad = rentabilidad;
		this.ganancia = ganancia;
		this.precio_venta = precio_venta;
		this.stock = stock;
	}
	public Producto() {
		super();
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
	public Proveedor getProveedor() {
		return proveedor;
	}
	public void setProveedor(Proveedor proveedor) {
		this.proveedor = proveedor;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
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
	public double getPrecio_venta() {
		return precio_venta;
	}
	public void setPrecio_venta(double precio_venta) {
		this.precio_venta = precio_venta;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	
}
