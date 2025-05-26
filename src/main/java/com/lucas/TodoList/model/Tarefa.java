package com.lucas.TodoList.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Enumerated; // Importe esta anotação
import jakarta.persistence.EnumType;   // Importe esta anotação
import java.time.LocalDate;

import com.lucas.TodoList.model.Enums.StatusTarefa; // Importe o seu Enum

@Entity
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;

    @Enumerated(EnumType.STRING) // Armazena o enum como String no DB
    private StatusTarefa status; // O tipo do campo agora é o seu Enum StatusTarefa

    private LocalDate dataCriacao;

    public Tarefa() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public StatusTarefa getStatus() { // Getter agora retorna StatusTarefa
        return status;
    }

    public void setStatus(StatusTarefa status) { // Setter agora aceita StatusTarefa
        this.status = status;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
