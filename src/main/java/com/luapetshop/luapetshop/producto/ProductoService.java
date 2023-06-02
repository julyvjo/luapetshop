package com.luapetshop.luapetshop.producto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.repository.IProductoRepository;

@Service
public class ProductoService {
	private IProductoRepository productoRepository;
	
	@Autowired
	public ProductoService(IProductoRepository productoRepository) {
		this.productoRepository = productoRepository;
	}
	
	public List<Producto> getProductos() {
		return productoRepository.findAll();
		//return productoRepository.findAllCustom();
	}
}
