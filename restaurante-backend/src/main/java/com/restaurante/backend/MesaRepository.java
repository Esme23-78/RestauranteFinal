package com.restaurante.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MesaRepository extends JpaRepository<Mesa, String> {
    boolean existsByNumero(String numero);
    Optional<Mesa> findByNumero(String numero);
    void deleteByNumero(String numero);
}
