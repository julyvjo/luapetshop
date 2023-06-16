package com.luapetshop.luapetshop.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Integer>{

	Usuario findByUsername(String username);

}
