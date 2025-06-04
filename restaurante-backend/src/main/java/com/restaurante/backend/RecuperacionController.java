package com.restaurante.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/recuperacion")
@CrossOrigin(origins = "http://localhost:5173")
public class RecuperacionController {

    @Autowired
    private MeseroRepository meseroRepository;

    @Autowired
    private CorreoService correoService;

    @PostMapping
    public ResponseEntity<String> recuperar(@RequestBody RecuperacionRequest request) {
        String correo = request.getCorreo();

        Optional<Mesero> meseroOpt = meseroRepository.findByCorreo(correo);
        if (meseroOpt.isEmpty()) {
            return ResponseEntity.status(404).body("❌ El correo no está registrado.");
        }

        Mesero mesero = meseroOpt.get();

        try {
            correoService.enviarCredenciales(
                mesero.getCorreo(),
                mesero.getUsuario(),
                mesero.getContrasena()
            );
            return ResponseEntity.ok("✅ Credenciales enviadas al correo.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Error al enviar el correo.");
        }
    }
}
