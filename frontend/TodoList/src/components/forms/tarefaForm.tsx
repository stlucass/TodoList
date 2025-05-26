import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TarefaData } from '../../interface/tarefaData';
import './tarefaForm.css';

const API_URL = "http://localhost:3000/api/tarefas";

type TarefaCreateFormData = Omit<TarefaData, 'id' | 'dataCriacao'>;
type TarefaUpdateFormData = Omit<TarefaData, 'dataCriacao'>;

const postTarefa = async (novaTarefa: TarefaCreateFormData): Promise<TarefaData> => {
  const response = await axios.post(API_URL, novaTarefa);
  return response.data;
};

const updateTarefa = async (tarefaAtualizada: TarefaUpdateFormData): Promise<TarefaData> => {
  if (!tarefaAtualizada.id) {
    throw new Error("ID da tarefa é necessário para atualização.");
  }
  const response = await axios.put(`${API_URL}/${tarefaAtualizada.id}`, tarefaAtualizada);
  return response.data;
};

interface TarefaFormProps {
  tarefaParaEditar?: TarefaData | null;
  onCancelEdit?: () => void;
  onFormSubmitSuccess?: () => void;
}

export function TarefaForm({ tarefaParaEditar, onCancelEdit, onFormSubmitSuccess }: TarefaFormProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState<TarefaData['status']>('PENDENTE');

  const queryClient = useQueryClient();
  const isEditing = !!tarefaParaEditar;

  useEffect(() => {
    if (tarefaParaEditar) {
      setTitulo(tarefaParaEditar.titulo || '');
      setDescricao(tarefaParaEditar.descricao || '');
      setStatus(tarefaParaEditar.status || 'PENDENTE');
    } else {
      setTitulo('');
      setDescricao('');
      setStatus('PENDENTE');
    }
  }, [tarefaParaEditar]);

  const mutation = useMutation<
    TarefaData,
    Error,
    TarefaCreateFormData | TarefaUpdateFormData
  >({
    mutationFn: (formData) => {
      if (isEditing) {
        return updateTarefa(formData as TarefaUpdateFormData);
      } else {
        return postTarefa(formData as TarefaCreateFormData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarefas'] });
      if (onFormSubmitSuccess) {
        onFormSubmitSuccess();
      }
      if (!isEditing) {
        setTitulo('');
        setDescricao('');
        setStatus('PENDENTE');
      }
      console.log(isEditing ? "Tarefa atualizada com sucesso!" : "Tarefa criada com sucesso!");
    },
    onError: (error) => {
      console.error(isEditing ? "Erro ao atualizar tarefa:" : "Erro ao criar tarefa:", error);
      alert(isEditing ? "Falha ao atualizar tarefa." : "Falha ao criar tarefa.");
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!titulo.trim()) {
      alert("O título da tarefa é obrigatório.");
      return;
    }

    if (isEditing && tarefaParaEditar) {
      if (!tarefaParaEditar.id) {
        alert("Erro: ID da tarefa para edição não encontrado.");
        return;
      }
      const tarefaAtualizada: TarefaUpdateFormData = {
        id: tarefaParaEditar.id,
        titulo,
        descricao,
        status,
      };
      mutation.mutate(tarefaAtualizada);
    } else {
      const novaTarefa: TarefaCreateFormData = {
        titulo,
        descricao,
        status,
      };
      mutation.mutate(novaTarefa);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tarefa-form">
      <h2>{isEditing ? 'Editar Tarefa' : 'Criar Nova Tarefa'}</h2>
      <div className="form-group">
        <label htmlFor="titulo">Título:</label>
        <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="descricao">Descrição:</label>
        <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value as TarefaData['status'])}>
          <option value="PENDENTE">Pendente</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="CONCLUIDA">Concluída</option>
        </select>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn-azul"
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? (isEditing ? 'Salvando...' : 'Criando...')
            : (isEditing ? 'Salvar Alterações' : 'Criar Tarefa')}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn-cinza"
            onClick={onCancelEdit}
            disabled={mutation.isPending}
          >
            Cancelar Edição
          </button>
        )}
      </div>
      {mutation.isError && (
        <p className="error-message">
          {isEditing ? 'Erro ao atualizar tarefa' : 'Erro ao criar tarefa'}:
          {mutation.error instanceof Error ? mutation.error.message : " Tente novamente."}
        </p>
      )}
    </form>
  );
}
