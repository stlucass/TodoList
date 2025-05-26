import './card.css'; // Certifique-se que este arquivo existe na mesma pasta

interface CardProps {
  // O 'id' não é usado diretamente para renderização no Card, mas é passado como 'key' pelo App.tsx
  titulo: string | null | undefined;
  descricao?: string | null | undefined; // Descrição pode ser opcional ou nula
  status: string | null | undefined;
  dataCriacao: string | null | undefined;
}

export function Card({ titulo, descricao, status, dataCriacao }: CardProps) {
  // Tratamento para o título
  const displayTitulo = titulo || 'Título Indisponível';

  // Tratamento para o status
  let statusText = 'Indefinido';
  let statusClass = 'indefinido'; // Classe CSS padrão para status indefinido

  if (typeof status === 'string' && status.trim() !== '') {
    statusText = status.replace('_', ' ');
    statusClass = status.toLowerCase().replace('_', '-');
  } else if (status) {
    // Caso status seja um número ou outro tipo (improvável, mas para ser seguro)
    statusText = String(status);
    statusClass = String(status).toLowerCase();
  }

  // Tratamento para a data de criação
  let dataFormatada = '';
  if (typeof dataCriacao === 'string' && dataCriacao.trim() !== '') {
    try {
      const dateObj = new Date(dataCriacao);
      // Verifica se a data é válida
      if (!isNaN(dateObj.getTime())) {
        dataFormatada = dateObj.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      } else {
        console.warn(`[Card.tsx] dataCriacao recebida é uma string inválida para data: "${dataCriacao}" para o título: "${displayTitulo}"`);
        dataFormatada = 'Data Inválida';
      }
    } catch (e) {
      console.error(`[Card.tsx] Erro ao processar dataCriacao: "${dataCriacao}" para o título: "${displayTitulo}"`, e);
      dataFormatada = 'Erro na Data';
    }
  } else if (dataCriacao) {
    // Se dataCriacao não for string mas for "truthy" (improvável para este caso)
     console.warn(`[Card.tsx] dataCriacao recebida não é uma string válida:`, dataCriacao, `para o título: "${displayTitulo}"`);
  }


  return (
    <div className="tarefa-card-individual">
      <div className="tarefa-cabecalho">
        <h3 className="tarefa-titulo">{displayTitulo}</h3>
        <span className={`tarefa-status ${statusClass}`}>
          {statusText}
        </span>
      </div>

      {/* Renderiza a descrição apenas se ela existir e não for uma string vazia */}
      {(typeof descricao === 'string' && descricao.trim() !== '') && (
        <p className="tarefa-descricao">{descricao}</p>
      )}

      <div className="tarefa-rodape">
        {dataFormatada && ( // Renderiza a data apenas se dataFormatada tiver um valor
          <span className="tarefa-data-criacao">
            Criada em: {dataFormatada}
          </span>
        )}
        <div className="tarefa-acoes">
          <button className="btn-editar">Editar</button>
          <button className="btn-excluir">Excluir</button>
        </div>
      </div>
    </div>
  );
}