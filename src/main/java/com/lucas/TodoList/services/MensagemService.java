package com.lucas.TodoList.services;

import org.springframework.stereotype.Service;

import com.lucas.TodoList.repositories.MensagemRepository;

@Service
public class MensagemService {
    private final MensagemRepository mensagemRepository;
        public MensagemService(MensagemRepository mensagemRepository) {
            this.mensagemRepository = mensagemRepository;
        }

        public String obterMensagem() {
            return mensagemRepository.obterMensagem();
        }
    }
