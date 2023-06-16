package com.luapetshop.luapetshop.model;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.repository.IMedioPagoRepository;

@Service
public class MedioPagoService {
	private IMedioPagoRepository medioPagoRepository;
	
	@Autowired
	public MedioPagoService(IMedioPagoRepository medioPagoRepository) {
		this.medioPagoRepository = medioPagoRepository;
	}
	
	public List<MedioPago> getMediosPago() {
		return medioPagoRepository.findAll();
	}
	
	public Optional<MedioPago> getMedioPago(int id) {
		return medioPagoRepository.findById(id);
	}

}
