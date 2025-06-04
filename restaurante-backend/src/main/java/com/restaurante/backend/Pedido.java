package com.restaurante.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "PEDIDOS")
public class Pedido {

    @Id
    private String id;  // VARCHAR2(3) como clave primaria

    @Column(nullable = false)
    private String mesa;

    private String cliente;
    private String telefono;

    @Column(nullable = false)
    private double total;

    @Column(nullable = false)
    private String estado; // 'Activo' o 'Finalizado'

    private String hora;

    // Getters y Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMesa() {
        return mesa;
    }

    public void setMesa(String mesa) {
        this.mesa = mesa;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }
}
