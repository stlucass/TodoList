import './card.css';
import type { TarefaData } from '../../interface/tarefaData'; // Ajuste o caminho se necessário

interface CardProps {
  tarefa: TarefaData;
  onEdit: (tarefa: TarefaData) => void;
  onDelete: (tarefaId: number) => void; // Nova prop para exclusão
}

export function Card({ tarefa, onEdit, onDelete }: CardProps) {
  const { id, titulo, descricao, status, dataCriacao } = tarefa; // 'id' é necessário para onDelete

  // Tratamento para o status (como na versão robusta anterior)
  let statusText = 'Indefinido';
  let statusClass = 'indefinido';
  if (typeof status === 'string' && status.trim() !== '') {
    statusText = status.replace('_', ' ');
    statusClass = status.toLowerCase().replace('_', '-');
  } else if (status) {
    statusText = String(status);
    statusClass = String(status).toLowerCase();
  }

  // Tratamento para a data de criação (como na versão robusta anterior)
  let dataFormatada = '';
  if (typeof dataCriacao === 'string' && dataCriacao.trim() !== '') {
    try {
      const dateObj = new Date(dataCriacao);
      if (!isNaN(dateObj.getTime())) {
        dataFormatada = dateObj.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      } else {
        dataFormatada = 'Data Inválida';
      }
    } catch (e) {
      dataFormatada = 'Erro na Data';
    }
  }

  const handleEditClick = () => {
    onEdit(tarefa);
  };

  const handleDeleteClick = () => {
    if (id === undefined || id === null) { // Verificação de segurança
        console.error("ID da tarefa é indefinido, não é possível excluir.");
        alert("Erro: ID da tarefa não encontrado.");
        return;
    }
    onDelete(id); // Chama a função onDelete passada pelo App.tsx com o ID da tarefa
  };

  return (
    <div className="tarefa-card-individual">
      <div className="tarefa-cabecalho">
        <h3 className="tarefa-titulo">{titulo || 'Título Indisponível'}</h3>
        <span className={`tarefa-status ${statusClass}`}>
          {statusText}
        </span>
      </div>

      {(typeof descricao === 'string' && descricao.trim() !== '') && (
        <p className="tarefa-descricao">{descricao}</p>
      )}

      <div className="tarefa-rodape">
        {dataFormatada && (
          <span className="tarefa-data-criacao">
            Criada em: {dataFormatada}
          </span>
        )}
        <div className="tarefa-acoes">
          <button className="btn-editar" onClick={handleEditClick}>Editar</button>
          <button className="btn-excluir" onClick={handleDeleteClick}>Excluir</button>
        </div>
      </div>
    </div>
  );
}
