package com.luapetshop.luapetshop.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

	private IUsuarioRepository usuarioRepository;
	
	@Autowired
	public UsuarioService(IUsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}
	
}
