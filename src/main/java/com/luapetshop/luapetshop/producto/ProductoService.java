package com.luapetshop.luapetshop.producto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

	public List<Producto> getProductosByName(String nombre) {

		return productoRepository.findByNombreContaining(nombre);
	}

	public Page<Producto> getPageProducto(Pageable pageable, String nombre) {
		
		if(nombre == null)
			return productoRepository.findAll(pageable);
		else
			return productoRepository.findByNombreContaining(nombre, pageable);
	}
}
