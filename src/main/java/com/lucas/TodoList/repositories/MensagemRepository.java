package com.lucas.TodoList.repositories;

import org.springframework.stereotype.Repository;

@Repository
public class MensagemRepository {
    public String obterMensagem() {
        return "Olá do repositorio!";
    }
}
