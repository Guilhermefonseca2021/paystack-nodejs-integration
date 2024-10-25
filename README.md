# 🎯 Sistema de Doações e Assinaturas

Este projeto permite que usuários façam **doações** para campanhas e assinem **planos recorrentes** usando cartões de crédito. Abaixo estão as funcionalidades, orientações de instalação e informações gerais em formato resumido.

## 💻 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en) Plataforma para executar JavaScript no servidor.
- [Express.js](https://expressjs.com/) Framework para criar APIs RESTful.
- [MongoDB](https://www.mongodb.com/atlas) banco nao relacional de dados.
- [PayStack](https://dashboard.paystack.com/#/get-started) (ou outro gateway de pagamento): Processamento de pagamentos online.
- [Typescript](https://www.typescriptlang.org/) typagem para troca de metadados usando entre aplicao e servidor.


## 🚀 Funcionalidades Principais

- [x] **Cadastro de Usuários**  
  Os usuários podem criar contas, acessar e gerenciar suas doações e assinaturas.

- [x] **Doações para Campanhas**  
  Usuários podem visualizar campanhas ativas e doar via cartão de crédito. Doações são processadas com segurança.

- [x] **Assinaturas de Planos**  
  Usuários podem escolher e assinar planos de contribuição recorrente (mensal, anual, etc.) com cobrança automática.

- [x] **Administração de Campanhas e Planos**  
  Administradores podem criar, editar e excluir campanhas e planos de assinatura.


Configure as variáveis de ambiente: Crie um arquivo .env com as seguintes informações:

.env
```bash
PORT=3333
NODE_ENV=
PAYSTACK_SECRET_KEY=
NGROK_AUTHTOKEN=
MONGODB_URI=
```

## Endpoints:


iniciar pagamento com usuario: 

```bash
http://localhost:port/users/initiatetransaction/:id
```

![https___dev-to-uploads s3 amazonaws com_uploads_articles_es1j57c88uc225ijayri](https://github.com/user-attachments/assets/61bc2342-66c9-4de1-9cc0-f1450a0d9712)

Apos iniciar pagamento geramos um gatway de pagamentos com url pelo paystack ja podemos pagar:

![https___dev-to-uploads s3 amazonaws com_uploads_articles_zhnk12u1u8526pwct5mn](https://github.com/user-attachments/assets/cb00c244-48bb-4acd-8725-70bb447f25c4)


veririficar transacoes de usuarios

```bash
http://localhost:users/verifytransactions/:id 
```

![https___dev-to-uploads s3 amazonaws com_uploads_articles_idjb1ka6xoatbds476dl](https://github.com/user-attachments/assets/d7e2454c-3075-4a14-bebb-e8963ad8a316)


![https___dev-to-uploads s3 amazonaws com_uploads_articles_xd6knfpiu2967c4oww6z](https://github.com/user-attachments/assets/4c1af23f-456a-4ccd-9eab-1e3f7a961433)


rotas de planos:

```bash
// criar um plano para o usuario assinar
$  http://localhost:users/plan/createplans
// ver todos os planos da minha aplicacao
$  http://localhost:users/plan/getplans
```

## 🛠️ Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/guilhermefonseca2021/paystack-nodejs-integration
   ```

## Instale as dependências:

```bash
cd paystack-nodejs-integration
npm install
```

## 🌱 Contribuição

Quer contribuir? sera sempre bem-vindo, Abra um pull request no GitHub.


## 📄 Licença
Este projeto está licenciado sob a [MIT License](https://opensource.org/programs).
