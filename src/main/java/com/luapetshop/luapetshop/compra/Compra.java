package com.luapetshop.luapetshop.compra;

import com.luapetshop.luapetshop.proveedor.Proveedor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	//private int id_medio_pago;
	
	public Compra() {
		super();
	}

	public Compra(int id_compra, Proveedor proveedor, double total) {
		super();
		this.id_compra = id_compra;
		this.proveedor = proveedor;
		this.total = total;
	}

	public Compra(Proveedor proveedor, double total) {
		super();
		this.proveedor = proveedor;
		this.total = total;
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
