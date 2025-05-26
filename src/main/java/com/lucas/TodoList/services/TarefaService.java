package com.lucas.TodoList.services;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
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
    public Optional<Tarefa> buscarTarefaPorId(Long id) {
        return tarefaRepository.findById(id);
    }

    public Tarefa criarTarefa(Tarefa tarefa) {
        tarefa.setDataCriacao(LocalDate.now());
        return tarefaRepository.save(tarefa);
    }
     public Tarefa atualizarTarefa(Long id, Tarefa tarefaAtualizada) {
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(id);

        if (optionalTarefa.isPresent()) {
            Tarefa tarefaExistente = optionalTarefa.get();

            // Atualiza os campos fornecidos
            tarefaExistente.setTitulo(tarefaAtualizada.getTitulo());
            tarefaExistente.setDescricao(tarefaAtualizada.getDescricao());
            tarefaExistente.setStatus(tarefaAtualizada.getStatus()); // Atualiza o status

            return tarefaRepository.save(tarefaExistente);
        } else {
            // Se a tarefa não for encontrada, retorne null ou lance uma exceção
            return null;
        }
    }
    public void deletarTarefa(Long id) {
        tarefaRepository.deleteById(id);
    }
    
}
