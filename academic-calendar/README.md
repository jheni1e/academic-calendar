# Academic Calendar — Frontend

## Estrutura do Projeto

```text
src/
├── components/
├── fonts/
├── images/
├── objects/
├── pages/
├── routes/
├── utils/
├── App.jsx
├── main.jsx
└── index.css
```

## Organização Geral

A arquitetura do projeto foi organizada de forma modular, separando as responsabilidades entre componentes reutilizáveis, páginas, recursos estáticos e funções auxiliares. Essa estrutura facilita a manutenção, promove o reaproveitamento de código e torna a aplicação mais escalável, permitindo a inclusão de novas funcionalidades sem impactar significativamente as existentes.

### Estrutura dos diretórios

| Diretório | Descrição |
|-----------|-----------|
| **components/** | Componentes reutilizáveis da interface, como botões, campos de texto, modais, seletores e demais elementos visuais compartilhados entre as páginas. |
| **fonts/** | Fontes utilizadas pela aplicação para manter a identidade visual do sistema. |
| **images/** | Imagens, ícones, logotipos e outros recursos gráficos utilizados na interface. |
| **objects/** | Objetos, constantes e listas compartilhadas, como tipos de eventos, frequências e demais dados estáticos da aplicação. |
| **pages/** | Páginas da aplicação, responsáveis pela composição da interface e pela organização dos componentes de cada tela. |
| **routes/** | Configuração das rotas da aplicação utilizando React Router, definindo a navegação entre as páginas. |
| **utils/** | Funções utilitárias reutilizáveis, como formatação de datas, notificações (toast), validações e outras funções auxiliares. |
| **App.jsx** | Componente principal da aplicação, responsável por estruturar a interface e renderizar as rotas e componentes globais. |
| **main.jsx** | Ponto de entrada da aplicação React, responsável pela inicialização do projeto e renderização do componente principal. |
| **index.css** | Arquivo de estilos globais utilizado por toda a aplicação. |