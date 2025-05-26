import './App.css';
import { Card } from './components/cards/card';
import { TarefaForm } from './components/forms/tarefaForm';
import type { TarefaData } from './interface/tarefaData';
import { useTarefaData } from './hooks/useTarefaData';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Importe useMutation e useQueryClient
import axios from 'axios'; // Importe axios
import { useState } from 'react';

const API_URL = "http://localhost:3000/api/tarefas"; // Endpoint do backend

// Função para deletar uma tarefa via API
const deleteTarefaAPI = async (tarefaId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${tarefaId}`);
};

function App() {
  const { data: tarefas, isLoading, isError, error } = useTarefaData();
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<TarefaData | null>(null);
  
  const queryClient = useQueryClient();

  // Mutação para deletar tarefas
  const deleteMutation = useMutation({
    mutationFn: deleteTarefaAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarefas'] }); // Invalida a query para atualizar a lista
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
    // Opcional: Adicionar uma confirmação antes de excluir
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

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <TarefaForm 
        tarefaParaEditar={tarefaEmEdicao} 
        onCancelEdit={handleCancelEdit}
        onFormSubmitSuccess={handleFormSubmitSuccess}
      />

      {isLoading && <p>Carregando tarefas...</p>}
      {isError && <p>Erro ao carregar tarefas: {error instanceof Error ? error.message : 'Ocorreu um erro desconhecido'}</p>}
      
      <div className="card-container">
        {!isLoading && !isError && tarefas?.map((tarefa: TarefaData) => ( 
          <Card
            key={tarefa.id}
            tarefa={tarefa} 
            onEdit={handleEdit}
            onDelete={handleDelete} // Passa a função de exclusão para o Card
          />
        ))}
        {!isLoading && !isError && tarefas?.length === 0 && (
          <p>Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default App;
