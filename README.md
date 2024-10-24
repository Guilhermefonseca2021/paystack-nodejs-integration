# 🎯 Sistema de Doações e Assinaturas

Este projeto permite que usuários façam **doações** para campanhas e assinem **planos recorrentes** usando cartões de crédito. Abaixo estão as funcionalidades, orientações de instalação e informações gerais em formato resumido.

## 🚀 Funcionalidades Principais

- [x] **Cadastro de Usuários**  
  Os usuários podem criar contas, acessar e gerenciar suas doações e assinaturas.

- [x] **Doações para Campanhas**  
  Usuários podem visualizar campanhas ativas e doar via cartão de crédito. Doações são processadas com segurança.

- [x] **Assinaturas de Planos**  
  Usuários podem escolher e assinar planos de contribuição recorrente (mensal, anual, etc.) com cobrança automática.

- [x] **Administração de Campanhas e Planos**  
  Administradores podem criar, editar e excluir campanhas e planos de assinatura.

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

Configure as variáveis de ambiente: Crie um arquivo .env com as seguintes informações:

.env
```bash
DATABASE_URI=seu_banco_de_dados
PAYMENT_GATEWAY_API_KEY=sua_chave_api
```

## 💻 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en) Plataforma para executar JavaScript no servidor.
- [Express.js](https://expressjs.com/) Framework para criar APIs RESTful.
- [MongoDB](https://www.mongodb.com/atlas) banco nao relacional de dados.
- [PayStack](https://dashboard.paystack.com/#/get-started) (ou outro gateway de pagamento): Processamento de pagamentos online.

## 🌱 Contribuição

Quer contribuir? sera sempre bem-vindo, Abra um pull request no GitHub.


## 📄 Licença
Este projeto está licenciado sob a [MIT License](https://opensource.org/programs).