# Memorias Tempo PI

## Descrição do Projeto

O projeto "Memórias do Tempo" é um site web com conexão a um banco de dados relacional, desenvolvido para o armazenamento e gerenciamento de produtos antigos da loja "Memórias do Tempo". O objetivo é facilitar o registro, a organização e a consulta dos itens históricos da loja.

## Índice

1. [Introdução](#introdução)
2. [Requisitos do Sistema](#requisitos-do-sistema)
   - [Funcionais](#funcionais)
   - [Não Funcionais](#não-funcionais)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)    
    - [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
    - [Descrição das Tabelas](#descrição-das-tabelas)
5. [Funcionalidades](#funcionalidades)
6. [Equipe](#equipe)
7. [Licença](#licença)

## Introdução

O projeto "Memórias do Tempo" visa proporcionar um sistema eficiente para a catalogação de produtos antigos da loja, permitindo ao administrador realizar operações CRUD (Create, Read, Update, Delete) de maneira intuitiva e segura.

## Requisitos do Sistema

### Funcionais
- Cadastro de produtos
- Visualização de produtos
- Exclusão de produtos

### Não Funcionais
- Segurança dos dados
- Performance e escalabilidade

## Arquitetura do Sistema

### Tecnologias Utilizadas
- **Frontend:** HTML, CSS, JavaScript, Vue.js
- **Backend:** Node.js, Express.js
- **Banco de Dados:** ProstgreSQL

## Estrutura do Banco de Dados

### Descrição das Tabelas
- **Tabela `Produtos`:**
  - Colunas: id, nome, descrição, ano, valor, estoque, imagem.
- **Tabela `Usuários`:**
  - Colunas: id, nome, email e senha.

## Funcionalidades
- Página de listagem de produtos
- Página de cadastro de novos produtos
- Página de atualização de produtos
- Página de detalhes de produtos
- Funcionalidade de exclusão de produtos

## Equipe
- **Dímerson Ferreira:** Banco de Dados
- **Nathan Bizinoto:** Front-End
- **Paulo Henrique de Andrade:** Back-End
- **Vinicius Rodrigues:** Product Owner (PO)

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

