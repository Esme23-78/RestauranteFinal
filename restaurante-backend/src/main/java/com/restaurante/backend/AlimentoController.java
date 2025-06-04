package com.restaurante.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alimentos")
@CrossOrigin(origins = "*")
public class AlimentoController {

    @Autowired
    private AlimentoRepository alimentoRepository;

    @GetMapping
    public List<Alimento> listar() {
        return alimentoRepository.findAll();
    }

    @PostMapping
    public Alimento guardar(@RequestBody Alimento alimento) {
        return alimentoRepository.save(alimento);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        alimentoRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Alimento actualizar(@PathVariable Long id, @RequestBody Alimento nuevo) {
        return alimentoRepository.findById(id).map(alimento -> {
            alimento.setNombre(nuevo.getNombre());
            alimento.setPrecio(nuevo.getPrecio());
            alimento.setTipo(nuevo.getTipo());
            alimento.setDescripcion(nuevo.getDescripcion());
            return alimentoRepository.save(alimento);
        }).orElseGet(() -> {
            nuevo.setId(id);
            return alimentoRepository.save(nuevo);
        });
    }
}
