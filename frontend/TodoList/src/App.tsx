import './App.css';
import { Card } from './components/cards/card';
import { TarefaForm } from './components/forms/tarefaForm';
import type { TarefaData } from './interface/tarefaData';
// Correção na importação de StatusFiltro:
import { useTarefaData } from './hooks/useTarefaData';
import type { StatusFiltro } from './hooks/useTarefaData'; // Importado como tipo
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/tarefas";

const deleteTarefaAPI = async (tarefaId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${tarefaId}`);
};

function App() {
  const [statusFiltroSelecionado, setStatusFiltroSelecionado] = useState<StatusFiltro>('TODOS');
  const { data: tarefas, isLoading, isError, error } = useTarefaData(statusFiltroSelecionado);

  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<TarefaData | null>(null);
  
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTarefaAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarefas', statusFiltroSelecionado] });
      console.log("Tarefa excluída com sucesso!");
    },
    onError: (err) => {
      console.error("Erro ao excluir tarefa:", err);
      alert("Falha ao excluir tarefa.");
    },
  });

  const handleEdit = (tarefa: TarefaData) => {
    setTarefaEmEdicao(tarefa);
  };

  const handleDelete = (tarefaId: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      deleteMutation.mutate(tarefaId);
    }
  };

  const handleCancelEdit = () => {
    setTarefaEmEdicao(null);
  };

  const handleFormSubmitSuccess = () => {
    setTarefaEmEdicao(null); 
  };

  const handleFiltroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFiltroSelecionado(event.target.value as StatusFiltro);
  };

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <TarefaForm 
        tarefaParaEditar={tarefaEmEdicao} 
        onCancelEdit={handleCancelEdit}
        onFormSubmitSuccess={handleFormSubmitSuccess}
      />

      <div className="filtro-container" style={{ marginBottom: '20px', marginTop: '20px' }}>
        <label htmlFor="filtro-status" style={{ marginRight: '10px', fontWeight: 'bold' }}>Filtrar por Status:</label>
        <select id="filtro-status" value={statusFiltroSelecionado} onChange={handleFiltroChange}>
          <option value="TODOS">Todos</option>
          <option value="PENDENTE">Pendente</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="CONCLUIDA">Concluída</option>
        </select>
      </div>

      {isLoading && <p>Carregando tarefas...</p>}
      {isError && <p>Erro ao carregar tarefas: {error instanceof Error ? error.message : 'Ocorreu um erro desconhecido'}</p>}
      
      <div className="card-container">
        {!isLoading && !isError && tarefas?.map((tarefa: TarefaData) => ( 
          <Card
            key={tarefa.id} 
            tarefa={tarefa} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {!isLoading && !isError && tarefas?.length === 0 && (
          <p>Nenhuma tarefa encontrada para o filtro selecionado.</p>
        )}
      </div>
    </div>
  );
}

export default App;
