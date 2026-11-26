# Big Hangus Frontend

Frontend do sistema de estoque da Big Hangus. Interface web que consome a API REST do backend para o CRUD de ingredientes do estoque, permitindo cadastrar, consultar, listar, alterar e excluir ingredientes, além de destacar os itens em baixa.

## Tecnologias

- **Vue.js 3** — framework da interface
- **Vite** — servidor de desenvolvimento e build
- **Vue Router** — navegação entre as telas

## Repositórios relacionados

- Backend: https://github.com/vanescaSnt/big-hangus-backend

## Documentação

A documentação do projeto fica no repositório do backend:

- [Documento de visão](https://github.com/vanescaSnt/big-hangus-backend/blob/develop/docs/doc-visao.md)
- [Documento de modelos](https://github.com/vanescaSnt/big-hangus-backend/blob/develop/docs/doc-modelos.md)
- [Backlog](https://github.com/vanescaSnt/big-hangus-backend/blob/develop/docs/backlog.md)

## Integrantes

- Andressa Carla da Silva
- Elisson da Silva Tavares
- Gabriel Victor de Souza Fernandes
- Vanesca Héllen dos Santos Silva

## Setup

Pré-requisitos: Node.js 20 ou superior e o [backend](https://github.com/vanescaSnt/big-hangus-backend) rodando (veja o README dele).

Crie o `.env`:

```bash
cp .env.example .env
```

A variável `VITE_API_URL` aponta para a API (padrão `http://localhost:8000`). Ajuste se o backend estiver em outra porta ou endereço.

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

App: http://localhost:5173

## Build

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve o build localmente para conferir
```