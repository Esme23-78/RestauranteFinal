package com.restaurante.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/detalle")
@CrossOrigin(origins = "http://localhost:5173") // 💡 Solo permite peticiones desde el frontend React
public class DetallePedidoController {

    @Autowired
    private DetalleRepository detalleRepository;

    @Autowired
    private AlimentoRepository alimentoRepository;

    // ✅ Obtener todos los detalles
    @GetMapping
    public List<DetallePedido> obtenerTodos() {
        return detalleRepository.findAll();
    }

    // ✅ Obtener los detalles de un pedido específico
   
    @GetMapping("/pedido/{pedidoId}")
public List<Map<String, Object>> obtenerPorPedido(@PathVariable String pedidoId) {
    List<DetallePedido> lista = detalleRepository.findByPedidoId(pedidoId);
    List<Map<String, Object>> resultado = new ArrayList<>();

    for (DetallePedido detalle : lista) {
        Alimento alimento = alimentoRepository.findById(detalle.getAlimentoId()).orElse(null);
        if (alimento != null) {
            Map<String, Object> item = new HashMap<>();
            item.put("pedidoId", detalle.getPedidoId()); // 🔧 AÑADIR ESTA LÍNEA
            item.put("nombre", alimento.getNombre());
            item.put("tipo", alimento.getTipo());
            item.put("precio", detalle.getPrecio());
            item.put("alimentoId", detalle.getAlimentoId());
            resultado.add(item);
        }
    }

    return resultado;
}


    // ✅ Crear un nuevo detalle para un pedido
    @PostMapping
    public DetallePedido crear(@RequestBody DetallePedido detalle) {
        return detalleRepository.save(detalle);
    }

    // ✅ Eliminar todos los detalles de un pedido
    @DeleteMapping("/pedido/{pedidoId}")
    public ResponseEntity<?> eliminarPorPedido(@PathVariable String pedidoId) {
        try {
            List<DetallePedido> detalles = detalleRepository.findByPedidoId(pedidoId);
            if (detalles.isEmpty()) {
                return ResponseEntity.noContent().build(); // No hay detalles que borrar
            }

            detalleRepository.deleteAll(detalles);
            return ResponseEntity.ok("Detalles eliminados");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al eliminar los detalles: " + e.getMessage());
        }
    }
}
