package com.luapetshop.luapetshop.security;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "usuario", uniqueConstraints = @UniqueConstraint(columnNames = "username"))
public class Usuario{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_usuario;
    private String username;
	@Column(name = "password")
    private String password;
	public Usuario(int id_usuario, String username, String password) {
		super();
		this.id_usuario = id_usuario;
		this.username = username;
		this.password = password;
	}
	public Usuario(String username, String password, String roles) {
		super();
		this.username = username;
		this.password = password;
	}
	public Usuario() {
		super();
	}
	public int getId_usuario() {
		return id_usuario;
	}
	public void setId_usuario(int id_usuario) {
		this.id_usuario = id_usuario;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}















