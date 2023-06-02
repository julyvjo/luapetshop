package com.luapetshop.luapetshop.proveedor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="proveedor")
public class Proveedor {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_proveedor;
	private String nombre;

	public Proveedor() {
		super();
	}
	
	public Proveedor(int id_proveedor, String nombre) {
		super();
		this.id_proveedor = id_proveedor;
		this.nombre = nombre;
	}
	
	public Proveedor(String nombre) {
		super();
		this.nombre = nombre;
	}

	public int getId_proveedor() {
		return id_proveedor;
	}

	public void setId_proveedor(int id_proveedor) {
		this.id_proveedor = id_proveedor;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	
  
}
