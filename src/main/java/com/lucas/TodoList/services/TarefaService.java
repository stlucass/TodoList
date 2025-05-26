package com.lucas.TodoList.services;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.lucas.TodoList.exceptions.RecursoNaoEncontradoException;
import com.lucas.TodoList.model.Enums.StatusTarefa;
import com.lucas.TodoList.model.Tarefa;
import com.lucas.TodoList.repositories.TarefaRepository;

@Service
public class TarefaService {
    private final TarefaRepository tarefaRepository;
    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public List<Tarefa> listarTarefas() {
        return tarefaRepository.findAll();
    }
     public Tarefa buscarTarefaPorId(Long id) {	
        return tarefaRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Tarefa não encontrada com ID: " + id));
    }

    public Tarefa criarTarefa(Tarefa tarefa) {
        tarefa.setDataCriacao(LocalDate.now());
        return tarefaRepository.save(tarefa);
    }
     public Tarefa atualizarTarefa(Long id, Tarefa tarefaAtualizada) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);

        if (optionalTarefa.isPresent()) {
            Tarefa tarefaExistente = optionalTarefa.get();
            tarefaExistente.setTitulo(tarefaAtualizada.getTitulo());
            tarefaExistente.setDescricao(tarefaAtualizada.getDescricao());
            tarefaExistente.setStatus(tarefaAtualizada.getStatus());

            return tarefaRepository.save(tarefaExistente);
        } else {
            return null;
        }
    }
    public void deletarTarefa(Long id) {
        if(!tarefaRepository.existsById(id)){
            throw new RecursoNaoEncontradoException("Tarefa com ID " + id + " não encontrada")
        }
        tarefaRepository.deleteById(id);
    }
     public List<Tarefa> buscarTarefasPorStatus(StatusTarefa status) {
        return tarefaRepository.findByStatus(status);
    }
    
}