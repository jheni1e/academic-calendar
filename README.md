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

| Comando | Descrição |
|----------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Executa a build localmente |
| `npm run lint` | Executa o linter do projeto |

---

## Tecnologias utilizadas

- React.js
- Vite
- JavaScript
- React Router
- Axios
- ESLint
- React Toastify
- Recharts

---