package com.luapetshop.luapetshop.venta;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.luapetshop.luapetshop.cuenta.Movimiento;
import com.luapetshop.luapetshop.model.MedioPago;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="venta")
public class Venta {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_venta;
	@ManyToOne
	@JoinColumn(name = "id_medio_pago1")
	private MedioPago medio_pago1;
	@ManyToOne
	@JoinColumn(name = "id_medio_pago2")
	private MedioPago medio_pago2;
	private LocalDateTime fecha;
	private double parcial1;
	private double parcial2;
	private double total;
	private char estado;
	@OneToOne
	@JoinColumn(name = "id_movimiento")
	private Movimiento movimiento;
	@OneToMany(mappedBy = "venta")
	private List<LineaVenta> lineasVenta = new ArrayList<LineaVenta>();
	
	public Venta() {
		super();
	}

	public Venta(MedioPago medio_pago1, MedioPago medio_pago2, LocalDateTime fecha, double parcial1, double parcial2,
			double total, char estado, Movimiento movimiento, List<LineaVenta> lineasVenta) {
		super();
		this.medio_pago1 = medio_pago1;
		this.medio_pago2 = medio_pago2;
		this.fecha = fecha;
		this.parcial1 = parcial1;
		this.parcial2 = parcial2;
		this.total = total;
		this.estado = estado;
		this.movimiento = movimiento;
		this.lineasVenta = lineasVenta;
	}

	public Venta(int id_venta, MedioPago medio_pago1, MedioPago medio_pago2, LocalDateTime fecha, double parcial1,
			double parcial2, double total, char estado, Movimiento movimiento, List<LineaVenta> lineasVenta) {
		super();
		this.id_venta = id_venta;
		this.medio_pago1 = medio_pago1;
		this.medio_pago2 = medio_pago2;
		this.fecha = fecha;
		this.parcial1 = parcial1;
		this.parcial2 = parcial2;
		this.total = total;
		this.estado = estado;
		this.movimiento = movimiento;
		this.lineasVenta = lineasVenta;
	}



	public List<LineaVenta> getLineasVenta() {
		return lineasVenta;
	}



	public void setLineasVenta(List<LineaVenta> lineasVenta) {
		this.lineasVenta = lineasVenta;
	}

	public int getId_venta() {
		return id_venta;
	}

	public void setId_venta(int id_venta) {
		this.id_venta = id_venta;
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

	public MedioPago getMedio_pago1() {
		return medio_pago1;
	}

	public void setMedio_pago1(MedioPago medio_pago1) {
		this.medio_pago1 = medio_pago1;
	}

	public MedioPago getMedio_pago2() {
		return medio_pago2;
	}

	public void setMedio_pago2(MedioPago medio_pago2) {
		this.medio_pago2 = medio_pago2;
	}

	public double getParcial1() {
		return parcial1;
	}

	public void setParcial1(double parcial1) {
		this.parcial1 = parcial1;
	}

	public double getParcial2() {
		return parcial2;
	}

	public void setParcial2(double parcial2) {
		this.parcial2 = parcial2;
	}

	public Movimiento getMovimiento() {
		return movimiento;
	}

	public void setMovimiento(Movimiento movimiento) {
		this.movimiento = movimiento;
	}

	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}

	public LocalDateTime getFecha() {
		return fecha;
	}
	
  
}
