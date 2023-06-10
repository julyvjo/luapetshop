package com.luapetshop.luapetshop.venta;

import java.time.LocalDateTime;

import com.luapetshop.luapetshop.model.MedioPago;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="venta")
public class Venta {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_venta;
	@ManyToOne
	@JoinColumn(name = "id_medio_pago")
	private MedioPago medio_pago;
	private LocalDateTime fyh;
	private double total;
	private char estado;
	
	public Venta() {
		super();
	}

	public Venta(int id_venta, MedioPago medio_pago, LocalDateTime fyh, double total, char estado) {
		super();
		this.id_venta = id_venta;
		this.medio_pago = medio_pago;
		this.fyh = fyh;
		this.total = total;
		this.estado = estado;
	}

	public Venta(MedioPago medio_pago, LocalDateTime fyh, double total, char estado) {
		super();
		this.medio_pago = medio_pago;
		this.fyh = fyh;
		this.total = total;
		this.estado = estado;
	}

	public int getId_venta() {
		return id_venta;
	}

	public void setId_venta(int id_venta) {
		this.id_venta = id_venta;
	}

	public MedioPago getMedio_pago() {
		return medio_pago;
	}

	public void setMedio_pago(MedioPago medio_pago) {
		this.medio_pago = medio_pago;
	}

	public LocalDateTime getFyh() {
		return fyh;
	}

	public void setFyh(LocalDateTime fyh) {
		this.fyh = fyh;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public char getEstado() {
		return estado;
	}

	public void setEstado(char estado) {
		this.estado = estado;
	}
	
  
}