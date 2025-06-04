package com.restaurante.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "MESAS")
public class Mesa {

    @Id
    private String numero;

    @Column(nullable = false)
    private int capacidad;

    private String ubicacion;

    @Column(nullable = false)
    private String estado = "Disponible";

    // Getters y Setters

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public int getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(int capacidad) {
        this.capacidad = capacidad;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
