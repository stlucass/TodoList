// No seu App.tsx (Canvas: app_tsx_key_correction)

import './App.css';
import {Card} from './components/cards/card';
import { useTarefaData } from './hooks/useTarefaData';
import type { TarefaData } from './interface/tarefaData';

function App() {
  const { data, isLoading, isError, error } = useTarefaData(); // É bom ter isLoading e isError

  console.log("Dados recebidos do hook useTarefaData:", data); // LOG 1: Veja o array 'data' inteiro

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar dados: {error instanceof Error ? error.message : 'Erro desconhecido'}</p>;

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <div className="card-container">
      {data?.map((tarefa: TarefaData, index: number) => { // Adicione 'index' para um log mais claro
        console.log(`Item ${index}: ID da tarefa = `, tarefa.id, "Objeto tarefa completo:", tarefa); // LOG 2: Veja cada ID e tarefa
        if (tarefa.id === undefined || tarefa.id === null) {
          console.warn(`AVISO: Tarefa no índice ${index} tem ID indefinido ou nulo!`, tarefa);
        }
        return (
          <Card
            key={tarefa.id}
            titulo={tarefa.titulo} 
            descricao={tarefa.descricao}
            status={tarefa.status}
            dataCriacao={tarefa.dataCriacao}
          />
        );
      })}
      {data?.length === 0 && <p>Nenhuma tarefa encontrada.</p>}
      </div>
    </div>
  );
}
export default App;