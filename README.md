# 🏡 Uaibnb – Atividade Prática de Frontend

Este projeto foi desenvolvido como parte da atividade prática da disciplina de **Desenvolvimento Frontend**, com o objetivo de criar uma interface para o sistema fictício **Uaibnb**, utilizando **React** e integração com a **API do Airtable**.

---

## 🎯 Objetivo

Criar um formulário funcional para cadastrar novas hospedagens no Uaibnb, integrando-se a um backend baseado no Airtable. O projeto utiliza conceitos fundamentais de React, como componentes, hooks e estilização com styled-components.

---

## 🛠️ Tecnologias Utilizadas

- **React**
- **Styled-components**
- **Axios**
- **React Router DOM**
- **Airtable API**

---

## 🔗 Funcionalidades

- [x] Formulário para criar nova hospedagem
- [x] Campos: título, cidade, preço, descrição, imagem e características
- [x] Consumo de API (GET e POST) via Airtable
- [x] Estilização moderna e responsiva com Styled-components
- [x] Validação básica de campos obrigatórios
- [x] Marcação visual das características selecionadas com checkboxes estilizados

---

## 📦 Como Rodar o Projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/uaibnb-frontend.git
cd uaibnb-frontend
````

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto com as seguintes informações:

```env
REACT_APP_AIRTABLE_BASE_URL=https://api.airtable.com/v0/sua_base_id
REACT_APP_AIRTABLE_API_KEY=sua_api_key
```

> ⚠️ Assegure-se de que sua base no Airtable tenha as tabelas `locacoes` e `caracteristicas`.

4. **Rode o projeto:**

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

---

## 📁 Estrutura de Pastas (simplificada)

```
src/
├── pages/
│   ├── Add.jsx
│   ├── Caracteristicas.jsx
│   ├── Edicao.jsx
│   ├── EditarCaracteristica.jsx
│   ├── Home.jsx
│   ├── NovaCaracteristica.jsx
│
├── services/
│   └── api.js
│
├── App.js
├── index.js
├── index.css
└── .env

```

---

## 👨‍🎓 Sobre a Atividade

Trabalho desenvolvido para fins educacionais, como parte da disciplina de **Frontend** no curso de Análise e Desenvolvimento de Sistemas.

---

## 🤝 Agradecimentos

* Ao professor \Fabricio Lugão pela orientação.
* Ao grupo: Gustavo Monteiro, Júlia Ávila, Maria Eduarda, Sânio Trindade.

---

## 📌 Observações

* Este projeto foi focado em funcionalidades básicas de CRUD (create) usando a API externa.
* O backend está abstraído através do Airtable.
* A segurança da API depende do controle das chaves `.env`. Não exponha essas chaves em repositórios públicos.

---


## 📃 Licença

Este projeto é de uso educacional e não possui fins comerciais.

---
