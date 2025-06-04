package com.restaurante.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.transaction.Transactional; // IMPORTANTE para manejar transacciones

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:5173") // Permite solo desde tu frontend
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetalleRepository detalleRepository;

    @Autowired
    private MesaRepository mesaRepository;

    // ✅ Obtener todos los pedidos
    @GetMapping
    public List<Pedido> obtenerTodos() {
        return pedidoRepository.findAll();
    }

    // ✅ Obtener un pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtenerPorId(@PathVariable String id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        return pedido.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Crear un nuevo pedido
    @PostMapping
    public ResponseEntity<String> crearPedido(@RequestBody Pedido pedido) {
        try {
            pedidoRepository.save(pedido);
            return ResponseEntity.ok("✅ Pedido guardado correctamente");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("❌ Error al guardar el pedido");
        }
    }

    // ✅ Actualizar un pedido
    @PutMapping("/{id}")
    public ResponseEntity<Pedido> actualizar(@PathVariable String id, @RequestBody Pedido nuevo) {
        return pedidoRepository.findById(id).map(pedido -> {
            pedido.setCliente(nuevo.getCliente());
            pedido.setTelefono(nuevo.getTelefono());
            pedido.setTotal(nuevo.getTotal());
            return ResponseEntity.ok(pedidoRepository.save(pedido));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Eliminar pedido y liberar mesa (CON transacción para evitar error 500)
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<String> eliminar(@PathVariable String id) {
        Optional<Pedido> pedidoOptional = pedidoRepository.findById(id);
        if (pedidoOptional.isPresent()) {
            Pedido pedido = pedidoOptional.get();
            String numeroMesa = pedido.getMesa();

            // Liberar la mesa
            Optional<Mesa> mesaOptional = mesaRepository.findByNumero(numeroMesa);
            mesaOptional.ifPresent(mesa -> {
                mesa.setEstado("Desocupado");
                mesaRepository.save(mesa);
            });

            // Eliminar detalles y pedido
            detalleRepository.deleteByPedidoId(id);
            pedidoRepository.deleteById(id);

            return ResponseEntity.ok("✅ Pedido eliminado y mesa liberada");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Finalizar pedido sin eliminarlo y liberar mesa
    @PutMapping("/finalizar/{id}")
    public ResponseEntity<String> finalizarPedido(@PathVariable String id) {
        Optional<Pedido> pedidoOptional = pedidoRepository.findById(id);
        if (pedidoOptional.isPresent()) {
            Pedido pedido = pedidoOptional.get();
            pedido.setEstado("Finalizado");
            pedidoRepository.save(pedido);

            // Liberar mesa
            Optional<Mesa> mesaOptional = mesaRepository.findByNumero(pedido.getMesa());
            mesaOptional.ifPresent(mesa -> {
                mesa.setEstado("Desocupado");
                mesaRepository.save(mesa);
            });

            return ResponseEntity.ok("✅ Pedido finalizado y mesa liberada");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
