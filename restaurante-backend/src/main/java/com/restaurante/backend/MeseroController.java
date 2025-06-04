package com.restaurante.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;


@RestController
@RequestMapping("/meseros")
@CrossOrigin(origins = "*")
public class MeseroController {

    @Autowired
    private MeseroRepository meseroRepository;

    @GetMapping
    public List<Mesero> obtenerTodos() {
        return meseroRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mesero> obtenerPorId(@PathVariable Long id) {
        Optional<Mesero> mesero = meseroRepository.findById(id);
        return mesero.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Mesero nuevoMesero) {
        if (meseroRepository.existsByUsuario(nuevoMesero.getUsuario())) {
            return ResponseEntity.badRequest().body("⚠️ Usuario ya registrado.");
        }
        if (meseroRepository.existsByRfc(nuevoMesero.getRfc())) {
            return ResponseEntity.badRequest().body("⚠️ RFC ya registrado.");
        }
        return ResponseEntity.ok(meseroRepository.save(nuevoMesero));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Mesero datos) {
        return meseroRepository.findById(id).map(mesero -> {
            mesero.setNombre(datos.getNombre());
            mesero.setPaterno(datos.getPaterno());
            mesero.setMaterno(datos.getMaterno());
            mesero.setEdad(datos.getEdad());
            mesero.setSexo(datos.getSexo());
            mesero.setRfc(datos.getRfc());
            mesero.setTelefono(datos.getTelefono());
            mesero.setCorreo(datos.getCorreo());
            mesero.setDireccion(datos.getDireccion());
            mesero.setHorario(datos.getHorario());
            mesero.setUsuario(datos.getUsuario());
            mesero.setContrasena(datos.getContrasena());
            mesero.setRol(datos.getRol());
            return ResponseEntity.ok(meseroRepository.save(mesero));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        if (!meseroRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        meseroRepository.deleteById(id);
        return ResponseEntity.ok("✅ Mesero eliminado correctamente.");
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> datos) {
    String usuario = datos.get("usuario");
    String contrasena = datos.get("contrasena");

    return meseroRepository
        .findByUsuarioAndContrasena(usuario, contrasena)
        .<ResponseEntity<?>>map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.status(401).body("Credenciales incorrectas"));
}

}

