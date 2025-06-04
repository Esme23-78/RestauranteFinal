package com.restaurante.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MeseroRepository extends JpaRepository<Mesero, Long> {
    boolean existsByUsuario(String usuario);
    boolean existsByRfc(String rfc);

    Optional<Mesero> findByUsuarioAndContrasena(String usuario, String contrasena);

    Optional<Mesero> findByCorreo(String correo);
    
}
