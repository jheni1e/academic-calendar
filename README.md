# Academic Calendar

Esse repositório contém o projeto final do curso de Análise e Desenvolvimento de Sistemas no SENAI. Um calendário acadêmico criado para aumentar rastreabilidade, reduzir conflitos de horário e gerenciar aulas e eventos.

---

# Instruções de Uso do Projeto

## Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (instalado junto com o Node.js)
- **XAMPP Control Panel** (para rodar o banco Prisma em MySQL)

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

## Execução do Prisma

O primeiro passo é habilitar o **MySQL** no **XAMPP Control Panel**.

Então, para gerar o banco Prisma conforme o schema:

```bash
npx prisma generate
```

Para gerar a migration e aplicar no banco:

```bash
npx prisma migrate dev
```

Para popular o banco com a seed:

```bash
npm run seed
```

Se for preciso resetar o banco:

```bash
npm run reset
```

---

## Executando o projeto

```bash
npm run dev
```

Após iniciar o servidor, a aplicação estará disponível em:

| Serviço | Endereço |
|----------|----------|
| Frontend | `http://localhost:5173/calendario-academico` |
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
| `npm run seed` | Executa a seed que popula o banco | Back |
| `npm run reset` | Reseta o banco de dados | Back |

---

## Tecnologias utilizadas

- **React.js**: Construção da interface.
- **Vite**: Build e servidor de desenvolvimento.
- **JavaScript**: Linguagem utilizada no Frontend.
- **TypeScript**: Linguagem utilizada no Backend.
- **Node**: Ambiente de execução para desenvolver aplicações de servidor.
- **Express**: Framework que facilita a criação de APIs e aplicações web.
- **Prisma**: ORM para acesso ao banco de dados.
- **React Router**: Gerenciamento de rotas.
- **Axios**: Requisições HTTP para a API.
- **ESLint**: Padronização e análise de código.
- **React Toastify**: Exibição de notificações.
---
