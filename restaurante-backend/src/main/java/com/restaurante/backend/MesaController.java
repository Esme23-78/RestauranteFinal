package com.restaurante.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mesas")
@CrossOrigin(origins = "*")
public class MesaController {

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping
    public List<Mesa> obtenerMesas() {
        return mesaRepository.findAll();
    }

    @GetMapping("/{numero}")
    public ResponseEntity<Mesa> obtenerMesaPorNumero(@PathVariable String numero) {
        Optional<Mesa> mesa = mesaRepository.findByNumero(numero);
        return mesa.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> agregarMesa(@RequestBody Mesa mesa) {
        if (mesa.getNumero() == null || mesa.getNumero().isBlank()) {
            return ResponseEntity.badRequest().body("El número de mesa no puede estar vacío");
        }

        if (mesaRepository.existsByNumero(mesa.getNumero())) {
            return ResponseEntity.badRequest().body("Ya existe una mesa con ese número");
        }

        return ResponseEntity.ok(mesaRepository.save(mesa));
    }

    @PutMapping("/{numero}")
    public Mesa actualizarMesa(@PathVariable String numero, @RequestBody Mesa mesaActualizada) {
        return mesaRepository.findByNumero(numero).map(m -> {
            m.setCapacidad(mesaActualizada.getCapacidad());
            m.setUbicacion(mesaActualizada.getUbicacion());
            m.setEstado(mesaActualizada.getEstado());
            return mesaRepository.save(m);
        }).orElse(null);
    }

    @DeleteMapping("/{numero}")
    public ResponseEntity<String> eliminarMesa(@PathVariable String numero) {
        boolean tienePedidos = pedidoRepository.existsByMesa(numero);

        if (tienePedidos) {
            return ResponseEntity.badRequest().body("La mesa tiene pedidos asociados y no se puede eliminar");
        }

        mesaRepository.deleteByNumero(numero);
        return ResponseEntity.ok("Mesa eliminada correctamente");
    }

    @GetMapping("/siguiente-numero")
    public String obtenerSiguienteNumero() {
        List<Mesa> todas = mesaRepository.findAll();
        int siguiente = todas.stream()
                .map(Mesa::getNumero)
                .filter(n -> n.matches("\\d+"))
                .mapToInt(Integer::parseInt)
                .max()
                .orElse(0) + 1;

        return String.format("%03d", siguiente);
    }
}
