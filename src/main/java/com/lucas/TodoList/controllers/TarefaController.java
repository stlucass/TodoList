package com.lucas.TodoList.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.lucas.TodoList.model.Tarefa;
import com.lucas.TodoList.services.TarefaService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {
    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    // Endpoint para listar todas as tarefas
    @GetMapping()
    public List<Tarefa> listarTarefas() {
        return tarefaService.listarTarefas();
    } 

    // Endpoint para buscar uma tarefa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> buscarTarefa(@PathVariable Long id) {
            return tarefaService.buscarTarefaPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    // Endpoint para criar uma nova tarefa
    @PostMapping()
    public Tarefa criarTarefa(@RequestBody Tarefa tarefa) {
        return tarefaService.criarTarefa(tarefa);
    // Endpoint para atualizar uma tarefa
    }
    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(@PathVariable Long id, @RequestBody Tarefa tarefaAtualizada) {
        Tarefa tarefaSalva = tarefaService.atualizarTarefa(id, tarefaAtualizada);
        if (tarefaSalva != null) {
            return ResponseEntity.ok(tarefaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Endpoint para deletar uma tarefa existente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        tarefaService.deletarTarefa(id);
        return ResponseEntity.noContent().build();
    }
}
