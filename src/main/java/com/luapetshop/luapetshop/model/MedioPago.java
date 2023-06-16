package com.luapetshop.luapetshop.model;

import com.luapetshop.luapetshop.cuenta.Cuenta;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="medio_pago")
public class MedioPago {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_medio_pago;
	@OneToOne
	@JoinColumn(name = "id_cuenta")
	private Cuenta cuenta;
	private String nombre;
	private double modificador;
	
	public MedioPago() {
		super();
	}

	public MedioPago(int id_medio_pago, Cuenta cuenta, String nombre, double modificador) {
		super();
		this.id_medio_pago = id_medio_pago;
		this.cuenta = cuenta;
		this.nombre = nombre;
		this.modificador = modificador;
	}

	public MedioPago(Cuenta cuenta, String nombre, double modificador) {
		super();
		this.cuenta = cuenta;
		this.nombre = nombre;
		this.modificador = modificador;
	}

	public int getId_medio_pago() {
		return id_medio_pago;
	}

	public void setId_medio_pago(int id_medio_pago) {
		this.id_medio_pago = id_medio_pago;
	}

	

	public Cuenta getCuenta() {
		return cuenta;
	}

	public void setCuenta(Cuenta cuenta) {
		this.cuenta = cuenta;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public double getModificador() {
		return modificador;
	}

	public void setModificador(double modificador) {
		this.modificador = modificador;
	}
	
	
	
  
}
