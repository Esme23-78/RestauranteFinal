package com.restaurante.backend;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetalleRepository extends JpaRepository<DetallePedido, Long> {
    List<DetallePedido> findByPedidoId(String pedidoId);
    void deleteByPedidoId(String pedidoId); // ✅ Necesario para evitar el error 500
}
