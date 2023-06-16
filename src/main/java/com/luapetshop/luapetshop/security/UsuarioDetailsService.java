package com.luapetshop.luapetshop.security;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("usuarioDetailsService")
public class UsuarioDetailsService implements UserDetailsService {

	private IUsuarioRepository usuarioRepository;
	
	@Autowired
	public UsuarioDetailsService(IUsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario user = usuarioRepository.findByUsername(username);
		Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
		
		return new User(username, user.getPassword(), authorities);
	}
	
	public List<Usuario> getUsuarios(){
		return usuarioRepository.findAll();
	}
	
	public Optional<Usuario> getUsuario(int id) {
		return usuarioRepository.findById(id);
	}
	
	public Usuario getUsuarioByUsername(String username){
		return usuarioRepository.findByUsername(username);
	}
	
	public void addUsuario(Usuario usuario) {
		usuarioRepository.save(usuario);
	}
	
	public void updateUsuario(Usuario usuario) {
		usuarioRepository.save(usuario);
	}
	
	public void deleteUsuario(int id) {
		usuarioRepository.deleteById(id);
	}

}
	