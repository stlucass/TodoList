// frontend/TodoList/src/components/cards/card.tsx
import type { TarefaData } from '../../interface/tarefaData'; //
import './card.css'; //

interface CardProps {
  tarefa: TarefaData;
  onEdit: (tarefa: TarefaData) => void;
  onDelete: (tarefaId: number) => void;
}

export function Card({ tarefa, onEdit, onDelete }: CardProps) {
  const { id, titulo, descricao, status, dataCriacao } = tarefa; //

  let statusText = 'Indefinido';
  let statusBadgeClass = 'indefinido';
  let cardStatusClass = '';

  if (typeof status === 'string' && status.trim() !== '') {
    statusText = status.replace('_', ' ');
    statusBadgeClass = status.toLowerCase().replace('_', '-');
    
    if (status === 'PENDENTE') {
      cardStatusClass = 'status-pendente';
    } else if (status === 'EM_ANDAMENTO') {
      cardStatusClass = 'status-em-andamento';
    } else if (status === 'CONCLUIDA') {
      cardStatusClass = 'status-concluida';
    }
  } else if (status) {
    statusText = String(status);
    statusBadgeClass = String(status).toLowerCase();
  }

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
    if (id === undefined || id === null) {
        console.error("ID da tarefa é indefinido, não é possível excluir.");
        alert("Erro: ID da tarefa não encontrado.");
        return;
    }
    onDelete(id);
  };

  return (
    <div className={`tarefa-card ${cardStatusClass}`}>
      <div className="tarefa-cabecalho">
        <div className="tarefa-conteudo-principal">
          <h3 className="tarefa-titulo">{titulo || 'Título Indisponível'}</h3>
        </div>
        <span className={`tarefa-status ${statusBadgeClass}`}>
          {statusText}
        </span>
      </div>
      
      {(typeof descricao === 'string' && descricao.trim() !== '') && (
        <p className="tarefa-descricao">{descricao}</p>
      )}

      {/* BOTÕES DE AÇÃO VÊM ANTES DO RODAPÉ FINAL */}
      <div className="tarefa-acoes-container"> {/* Novo container para ações se precisar de espaçamento específico */}
        <div className="tarefa-acoes">
          <button className="btn-editar" onClick={handleEditClick}>Editar</button>
          <button className="btn-excluir" onClick={handleDeleteClick}>Excluir</button>
        </div>
      </div>

      {/* RODAPÉ COM A DATA E A LINHA DIVISÓRIA */}
      <div className="tarefa-rodape">
        {dataFormatada && (
          <span className="tarefa-data-criacao">
            Criada em: {dataFormatada}
          </span>
        )}
        {/* Se houver outros elementos no rodapé além da data, coloque-os aqui ou remova a data se não for mais necessária no rodapé */}
      </div>
    </div>
  );
}