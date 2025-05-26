package com.lucas.TodoList.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.lucas.TodoList.exceptions.RecursoNaoEncontradoException;
import com.lucas.TodoList.model.StatusTarefa;
import com.lucas.TodoList.model.Tarefa;
import com.lucas.TodoList.services.TarefaService;
import org.slf4j.Logger;

@RestController
@RequestMapping("/api/tarefas")
@CrossOrigin
public class TarefaController {
    private final TarefaService tarefaService;
    private static final Logger logger = LoggerFactory.getLogger(TarefaController.class);


    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

   
    @GetMapping()
    public List<Tarefa> listarTarefas() {
        return tarefaService.listarTarefas();
    }

    // Endpoint para buscar uma tarefa por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarTarefa(@PathVariable Long id) {
            try{
                Tarefa tarefa = tarefaService.buscarTarefaPorId(id);
                return ResponseEntity.ok(tarefa);
            }
            catch(RecursoNaoEncontradoException e){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

            }
    }

    // Endpoint para criar uma nova tarefa
    @PostMapping()
    public Tarefa criarTarefa(@RequestBody Tarefa tarefa) {
    logger.info("Criando tarefa - Payload recebido: titulo='{}', descricao='{}', status='{}'", 
                tarefa.getTitulo(), tarefa.getDescricao(), tarefa.getStatus());
    return tarefaService.criarTarefa(tarefa);
    }

    // ENDPOINT PARA ATUALIZAR UMA TAREFA (PUT) 
    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(@PathVariable Long id, @RequestBody Tarefa tarefaComNovosDados) {
        Tarefa tarefaSalva = tarefaService.atualizarTarefa(id, tarefaComNovosDados);
        if (tarefaSalva != null) {
            return ResponseEntity.ok(tarefaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para deletar uma tarefa existente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        try {
            tarefaService.deletarTarefa(id);
            return ResponseEntity.noContent().build();
        } catch (RecursoNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 se não encontrar
        }
    }
    // Endpoint para buscar tarefas por status
     @GetMapping("/status")
    public List<Tarefa> buscarTarefasPorStatus(@RequestParam StatusTarefa status) {
        return tarefaService.buscarTarefasPorStatus(status);
    }
}