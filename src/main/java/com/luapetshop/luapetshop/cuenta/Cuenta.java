package com.luapetshop.luapetshop.cuenta;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="cuenta")
public class Cuenta {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_cuenta;
	private String nombre;
	private double saldo;
	private double saldo_inicial;
	private LocalDateTime fecha_apertura;
	private LocalDateTime actualizado;
	
	
	public Cuenta() {
		super();
	}

	public Cuenta(int id_cuenta, String nombre, double saldo, double saldo_inicial, LocalDateTime fecha_apertura,
			LocalDateTime actualizado) {
		super();
		this.id_cuenta = id_cuenta;
		this.nombre = nombre;
		this.saldo = saldo;
		this.saldo_inicial = saldo_inicial;
		this.fecha_apertura = fecha_apertura;
		this.actualizado = actualizado;
	}

	public Cuenta(String nombre, double saldo, double saldo_inicial, LocalDateTime fecha_apertura,
			LocalDateTime actualizado) {
		super();
		this.nombre = nombre;
		this.saldo = saldo;
		this.saldo_inicial = saldo_inicial;
		this.fecha_apertura = fecha_apertura;
		this.actualizado = actualizado;
	}



	public int getId_cuenta() {
		return id_cuenta;
	}

	public void setId_cuenta(int id_cuenta) {
		this.id_cuenta = id_cuenta;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public double getSaldo() {
		return saldo;
	}

	public void setSaldo(double saldo) {
		this.saldo = saldo;
	}

	public double getSaldo_inicial() {
		return saldo_inicial;
	}

	public void setSaldo_inicial(double saldo_inicial) {
		this.saldo_inicial = saldo_inicial;
	}

	public LocalDateTime getFecha_apertura() {
		return fecha_apertura;
	}

	public void setFecha_apertura(LocalDateTime fecha_apertura) {
		this.fecha_apertura = fecha_apertura;
	}

	public LocalDateTime getActualizado() {
		return actualizado;
	}

	public void setActualizado(LocalDateTime actualizado) {
		this.actualizado = actualizado;
	}
  
}
