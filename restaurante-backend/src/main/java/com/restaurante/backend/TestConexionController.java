package com.restaurante.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestConexionController {

    @GetMapping("/conexion")
    public String probarConexion() {
        return "Conexión exitosa con Oracle!";
    }
}
