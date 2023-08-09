package com.luapetshop.luapetshop.venta;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.luapetshop.luapetshop.cuenta.Movimiento;
import com.luapetshop.luapetshop.model.MedioPago;

import jakarta.persistence.CascadeType;
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
	private Double parcial1;
	private Double parcial2;
	private Double total;
	private char estado;
	@OneToOne
	@JoinColumn(name = "id_movimiento1")
	private Movimiento movimiento1;
	@OneToOne
	@JoinColumn(name = "id_movimiento2")
	private Movimiento movimiento2;
	@OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<LineaVenta> lineasVenta = new ArrayList<LineaVenta>();
	
	public Venta() {
		super();
	}

	public Venta(MedioPago medio_pago1, MedioPago medio_pago2, LocalDateTime fecha, Double parcial1, Double parcial2,
			Double total, char estado, Movimiento movimiento1, Movimiento movimiento2, List<LineaVenta> lineasVenta) {
		super();
		this.medio_pago1 = medio_pago1;
		this.medio_pago2 = medio_pago2;
		this.fecha = fecha;
		this.parcial1 = parcial1;
		this.parcial2 = parcial2;
		this.total = total;
		this.estado = estado;
		this.movimiento1 = movimiento1;
		this.movimiento2 = movimiento2;
		this.lineasVenta = lineasVenta;
	}

	public Venta(int id_venta, MedioPago medio_pago1, MedioPago medio_pago2, LocalDateTime fecha, Double parcial1,
			Double parcial2, Double total, char estado, Movimiento movimiento1, Movimiento movimiento2,
			List<LineaVenta> lineasVenta) {
		super();
		this.id_venta = id_venta;
		this.medio_pago1 = medio_pago1;
		this.medio_pago2 = medio_pago2;
		this.fecha = fecha;
		this.parcial1 = parcial1;
		this.parcial2 = parcial2;
		this.total = total;
		this.estado = estado;
		this.movimiento1 = movimiento1;
		this.movimiento2 = movimiento2;
		this.lineasVenta = lineasVenta;
	}


	public List<LineaVenta> getLineasVenta() {
		return lineasVenta;
	}

	public Movimiento getMovimiento1() {
		return movimiento1;
	}

	public void setMovimiento1(Movimiento movimiento1) {
		this.movimiento1 = movimiento1;
	}

	public Movimiento getMovimiento2() {
		return movimiento2;
	}

	public void setMovimiento2(Movimiento movimiento2) {
		this.movimiento2 = movimiento2;
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

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
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

	public Double getParcial1() {
		return parcial1;
	}

	public void setParcial1(Double parcial1) {
		this.parcial1 = parcial1;
	}

	public Double getParcial2() {
		return parcial2;
	}

	public void setParcial2(Double parcial2) {
		this.parcial2 = parcial2;
	}


	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}

	public LocalDateTime getFecha() {
		return fecha;
	}
	
  
}
