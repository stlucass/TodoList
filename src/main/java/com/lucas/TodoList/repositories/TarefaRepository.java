package com.lucas.TodoList.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lucas.TodoList.model.StatusTarefa;
import com.lucas.TodoList.model.Tarefa;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
  List<Tarefa> findByStatus(StatusTarefa status);
    
}
