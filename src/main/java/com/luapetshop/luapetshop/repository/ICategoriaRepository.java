package com.luapetshop.luapetshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luapetshop.luapetshop.producto.Categoria;

public interface ICategoriaRepository extends JpaRepository<Categoria, Integer> {

}
