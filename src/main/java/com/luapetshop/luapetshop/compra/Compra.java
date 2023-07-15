package com.luapetshop.luapetshop.compra;

import java.time.LocalDateTime;

import com.luapetshop.luapetshop.cuenta.Movimiento;
import com.luapetshop.luapetshop.model.MedioPago;
import com.luapetshop.luapetshop.proveedor.Proveedor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="compra")
public class Compra {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_compra;
	@ManyToOne
	@JoinColumn(name = "id_proveedor")
	private Proveedor proveedor;
	private double total;
	private LocalDateTime fecha;
	@ManyToOne
	@JoinColumn(name = "id_medio_pago")
	private MedioPago medio_pago;
	@OneToOne
	@JoinColumn(name = "id_movimiento")
	private Movimiento movimiento;
	
	public Compra() {
		super();
	}
	
	public Compra(Proveedor proveedor, double total, LocalDateTime fecha, MedioPago medio_pago, Movimiento movimiento) {
		super();
		this.proveedor = proveedor;
		this.total = total;
		this.fecha = fecha;
		this.medio_pago = medio_pago;
		this.movimiento = movimiento;
	}

	public Compra(int id_compra, Proveedor proveedor, double total, LocalDateTime fecha, MedioPago medio_pago,
			Movimiento movimiento) {
		super();
		this.id_compra = id_compra;
		this.proveedor = proveedor;
		this.total = total;
		this.fecha = fecha;
		this.medio_pago = medio_pago;
		this.movimiento = movimiento;
	}


	public LocalDateTime getFecha() {
		return fecha;
	}

	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}

	public MedioPago getMedio_pago() {
		return medio_pago;
	}

	public void setMedio_pago(MedioPago medio_pago) {
		this.medio_pago = medio_pago;
	}

	public Movimiento getMovimiento() {
		return movimiento;
	}

	public void setMovimiento(Movimiento movimiento) {
		this.movimiento = movimiento;
	}

	public int getId_compra() {
		return id_compra;
	}

	public void setId_compra(int id_compra) {
		this.id_compra = id_compra;
	}

	public Proveedor getProveedor() {
		return proveedor;
	}

	public void setProveedor(Proveedor proveedor) {
		this.proveedor = proveedor;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}
	
	
	
  
}
