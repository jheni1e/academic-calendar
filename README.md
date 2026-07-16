# Academic Calendar

This repository contains the final project of the Systems Analysis and Development course at SENAI. An academic calendar made to increase traceability, reduce scheduling conflicts, and manage classes and events.

---

# Instruções de Uso do Projeto

## Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (instalado junto com o Node.js)

---

## Clonando o projeto

Clone o repositório e acesse a pasta do projeto.

```bash
git clone https://github.com/jheni1e/academic-calendar.git
```

### Frontend

```bash
cd academic-calendar
```

### Backend

```bash
cd api
```

---

## Instalando as dependências

Utilizando **npm**:

```bash
npm install
```

---

## Executando o projeto

```bash
npm run dev
```

Após iniciar o servidor, a aplicação estará disponível em:

| Serviço | Endereço |
|----------|----------|
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:8080` |

---

## Build para produção

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos gerados ficarão na pasta:

```text
dist/
```

---

## Scripts disponíveis

| Comando | Descrição | Presença |
|----------|-----------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento | Front/Back |
| `npm run build` | Gera a versão de produção | Front/Back |
| `npm run preview` | Executa a build localmente | Front |
| `npm run lint` | Executa o linter do projeto | Front |
| `npm run generate` | Gera o prisma client conforme schema | Back |
| `npm run migrate` | Cria migration e aplica no banco | Back |
| `npm run push` | Atualiza o banco sem gerar migration | Back |
| `npm run studio` | Abre interface web para ver o banco | Back |

---

## Tecnologias utilizadas

- **React.js**: Construção da interface.
- **Vite**: Build e servidor de desenvolvimento.
- **JavaScript**: Linguagem utilizada.
- **Prisma**: ORM para acesso ao banco de dados.
- **React Router**: Gerenciamento de rotas.
- **Axios**: Requisições HTTP para a API.
- **ESLint**: Padronização e análise de código.
- **React Toastify**: Exibição de notificações.
- **Recharts**: Criação de gráficos.
---
