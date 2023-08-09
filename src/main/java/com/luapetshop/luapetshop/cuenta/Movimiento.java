package com.luapetshop.luapetshop.cuenta;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="movimiento")
public class Movimiento {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_movimiento;
	
	@ManyToOne
	@JoinColumn(name = "id_cuenta")
	private Cuenta cuenta;
	private LocalDateTime fecha;
	private double monto;
	private char tipo;
	private String motivo;
	
	public Movimiento() {
		super();
	}

	public Movimiento(int id_movimiento, Cuenta cuenta, LocalDateTime fecha, double monto, char tipo, String motivo) {
		super();
		this.id_movimiento = id_movimiento;
		this.cuenta = cuenta;
		this.fecha = fecha;
		this.monto = monto;
		this.tipo = tipo;
		this.motivo = motivo;
	}

	public Movimiento(Cuenta cuenta, LocalDateTime fecha, double monto, char tipo, String motivo) {
		super();
		this.cuenta = cuenta;
		this.fecha = fecha;
		this.monto = monto;
		this.tipo = tipo;
		this.motivo = motivo;
	}

	public String getMotivo() {
		return motivo;
	}

	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}

	public int getId_movimiento() {
		return id_movimiento;
	}

	public void setId_movimiento(int id_movimiento) {
		this.id_movimiento = id_movimiento;
	}

	public Cuenta getCuenta() {
		return cuenta;
	}

	public void setCuenta(Cuenta cuenta) {
		this.cuenta = cuenta;
	}

	public LocalDateTime getFecha() {
		return fecha;
	}

	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}

	public double getMonto() {
		return monto;
	}

	public void setMonto(double monto) {
		this.monto = monto;
	}

	public char getTipo() {
		return tipo;
	}

	public void setTipo(char tipo) {
		this.tipo = tipo;
	}

	
  
}
