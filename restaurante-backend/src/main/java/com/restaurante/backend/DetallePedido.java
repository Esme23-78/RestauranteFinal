package com.restaurante.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "DETALLEPEDIDO")
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pedido_id", nullable = false, length = 3) // Asegura VARCHAR(3) si aplica
    private String pedidoId;

    @Column(name = "alimento_id", nullable = false)
    private Long alimentoId;

    @Column(nullable = false)
    private double precio;

    // --- Getters y Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(String pedidoId) {
        this.pedidoId = pedidoId;
    }

    public Long getAlimentoId() {
        return alimentoId;
    }

    public void setAlimentoId(Long alimentoId) {
        this.alimentoId = alimentoId;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }
}
