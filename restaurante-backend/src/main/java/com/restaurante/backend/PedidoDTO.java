package com.restaurante.backend;

import java.util.List;

public class PedidoDTO {
    private Pedido pedido;
    private List<DetalleDTO> detalle;

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public List<DetalleDTO> getDetalle() {
        return detalle;
    }

    public void setDetalle(List<DetalleDTO> detalle) {
        this.detalle = detalle;
    }
}
