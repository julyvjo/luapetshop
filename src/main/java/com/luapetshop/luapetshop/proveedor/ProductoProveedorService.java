package com.luapetshop.luapetshop.proveedor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.repository.IProductoProveedorRepository;
import com.luapetshop.luapetshop.repository.IProductoRepository;
import com.luapetshop.luapetshop.repository.IProveedorRepository;

@Service
public class ProductoProveedorService {
	private IProductoProveedorRepository productoProveedorRepository;
	
	@Autowired
	public ProductoProveedorService(IProductoProveedorRepository productoProveedorRepository) {
		super();
		this.productoProveedorRepository = productoProveedorRepository;
	}
	
	
	public List<ProductoProveedor> getProductosProveedores() {
		
		List<ProductoProveedor> productosProveedores = productoProveedorRepository.findAllOrderByProducto();
		
		for(ProductoProveedor pp : productosProveedores) {
			pp.getProveedor();
			pp.getProducto();
		}
		
		return productosProveedores; 
	}


	public Page<ProductoProveedor> getPageProductoProveedor(Pageable pageable, String nombre) {
		Page<ProductoProveedor> pageProductoProveedor;
		
		if(nombre == null)
			pageProductoProveedor = productoProveedorRepository.findByNombreProductoContaining("", pageable);
		else
			pageProductoProveedor = productoProveedorRepository.findByNombreProductoContaining(nombre, pageable);
		
		return pageProductoProveedor;
	}

}
