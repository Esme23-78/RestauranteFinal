package com.restaurante.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, String> {
    boolean existsByMesa(String mesa); // mesa es el campo String de la entidad Pedido
}
