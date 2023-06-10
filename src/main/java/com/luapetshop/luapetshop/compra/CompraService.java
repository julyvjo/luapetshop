package com.luapetshop.luapetshop.compra;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luapetshop.luapetshop.repository.ICompraRepository;

@Service
public class CompraService {
	private ICompraRepository compraRepository;
	
	@Autowired
	public CompraService(ICompraRepository compraRepository) {
		this.compraRepository = compraRepository;
	}
	
	public List<Compra> getCompras() {
		return compraRepository.findAll();
	}

}
