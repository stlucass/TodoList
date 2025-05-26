# TodoList - Aplicação de Lista de Tarefas (Full Stack)

Este projeto é uma aplicação Full Stack de Lista de Tarefas, consistindo em um backend construído com Java e Spring Boot, e um frontend desenvolvido com React, TypeScript e Vite. A aplicação é containerizada usando Docker e orquestrada com Docker Compose, incluindo um banco de dados PostgreSQL.

## Estrutura do Projeto

O repositório está organizado da seguinte forma:

.
├── backend/
│   ├── src/                     # Código fonte Java/Spring Boot
│   ├── pom.xml                  # Dependências e build do backend (Maven)
│   └── Dockerfile               # Instruções para containerizar o backend
├── frontend/
│   └── TodoList/
│       ├── src/                 # Código fonte React/TypeScript
│       ├── public/              # Arquivos estáticos públicos do frontend
│       ├── package.json         # Dependências e scripts do frontend (npm)
│       ├── vite.config.ts       # Configuração do Vite
│       ├── nginx.conf           # Configuração do Nginx para servir o frontend
│       └── Dockerfile           # Instruções para containerizar o frontend
├── .gitignore                   # Arquivos ignorados pelo Git (exemplo, você precisará criar o seu)
├── docker-compose.yml           # Orquestração dos contêineres Docker
└── README.md                    # Este arquivo



## Tecnologias Utilizadas

**Backend:**
* Java 17
* Spring Boot 3.5.0 (com Spring Web, Spring Data JPA)
* Maven
* PostgreSQL (como banco de dados)

**Frontend:**
* React 19
* TypeScript
* Vite
* Axios (para chamadas HTTP)
* TanStack Query (React Query) (para gerenciamento de estado do servidor)
* Nginx (para servir os arquivos estáticos do frontend em produção via Docker)

**Ambiente e Orquestração:**
* Docker
* Docker Compose

## Pré-requisitos

Para rodar este projeto, você precisará ter instalados em sua máquina:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (que inclui Docker Engine e Docker Compose)

## Como Rodar o Projeto com Docker

1.  **Clone o Repositório:**
    Se você estiver acessando este projeto via Git, clone o repositório para sua máquina local:
    ```bash
    git clone https://github.com/stlucass/TodoList
    cd TodoList
    ```
    Se você já tem os arquivos, apenas navegue até a pasta raiz do projeto.

2.  **Construa as Imagens e Inicie os Contêineres:**
    Na pasta raiz do projeto (onde o arquivo `docker-compose.yml` está localizado), execute o seguinte comando no seu terminal:
    ```bash
    docker-compose up --build
    ```
    * O parâmetro `--build` garante que as imagens Docker sejam construídas (ou reconstruídas se houver alterações nos `Dockerfile`s ou nos contextos de build).
    * Este processo pode levar alguns minutos na primeira vez, pois o Docker fará o download das imagens base necessárias e construirá os artefatos das aplicações frontend e backend.

3.  **Acesse a Aplicação:**
    Após os contêineres iniciarem com sucesso, a aplicação estará disponível nos seguintes endereços:
    * **Frontend (Aplicação Web):** [http://localhost:8080](http://localhost:8080)
    * **Backend API (para referência ou testes diretos):** [http://localhost:3000/api/tarefas](http://localhost:3000/api/tarefas)

    Os logs de todos os serviços (banco de dados, backend, frontend) serão exibidos no terminal onde você executou o `docker-compose up`.

## Funcionalidades

* Criar novas tarefas com título, descrição e status (Pendente, Em Andamento, Concluída).
* Listar todas as tarefas.
* Editar tarefas existentes.
* Excluir tarefas.
* Filtrar tarefas por status.
* Interface de usuário reativa e moderna.
* Persistência de dados em um banco de dados PostgreSQL.

## Como Parar a Aplicação Dockerizada

1.  No terminal onde os contêineres estão rodando (onde você executou `docker-compose up`), pressione `Ctrl+C`. Isso enviará um sinal para parar os contêineres gracefully.
2.  Para remover os contêineres e a rede criada pelo Docker Compose (mas preservar o volume de dados do banco de dados), execute:
    ```bash
    docker-compose down
    ```
3.  Se você também quiser remover o volume de dados do banco de dados (ATENÇÃO: isso apagará todos os dados das tarefas), execute:
    ```bash
    docker-compose down -v
    ```

## Observações

* A porta `3000` é usada pelo backend e `8080` pelo frontend no host. A porta `5432` é usada pelo PostgreSQL, também mapeada para o host. Certifique-se de que essas portas não estejam em uso por outras aplicações no seu computador ao iniciar o projeto.
* O frontend utiliza `@tanstack/react-query` para gerenciar o estado do servidor e chamadas à API.
* O backend utiliza Spring Data JPA para interagir com o banco de dados PostgreSQL, com a configuração `spring.jpa.hibernate.ddl-auto=update` para gerenciar o schema do banco.

---

Sinta-se à vontade para explorar o código e executar a aplicação!
