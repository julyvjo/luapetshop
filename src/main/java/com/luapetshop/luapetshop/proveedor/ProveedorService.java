package com.luapetshop.luapetshop.proveedor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.repository.IProductoProveedorRepository;
import com.luapetshop.luapetshop.repository.IProductoRepository;
import com.luapetshop.luapetshop.repository.IProveedorRepository;

@Service
public class ProveedorService {
	private IProductoProveedorRepository productoProveedorRepository;
	
	@Autowired
	public ProveedorService(IProductoProveedorRepository productoProveedorRepository) {
		super();
		this.productoProveedorRepository = productoProveedorRepository;
	}
	
	
	public List<ProveedorDTO> getProveedoresDTO() {
		
		return productoProveedorRepository.findAllProveedorDTO();
	}

}
