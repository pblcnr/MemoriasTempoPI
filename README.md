# Memorias Tempo PI

## Descrição do Projeto

O projeto "Memórias do Tempo" é um site web com conexão a um banco de dados relacional, desenvolvido para o armazenamento e gerenciamento de produtos antigos da loja "Memórias do Tempo". O objetivo é facilitar o registro, a organização e a consulta dos itens históricos da loja.

## Índice

1. [Introdução](#introdução)
2. [Requisitos do Sistema](#requisitos-do-sistema)
   - [Funcionais](#funcionais)
   - [Não Funcionais](#não-funcionais)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Funcionalidades](#funcionalidades)
5. [Equipe](#equipe)
6. [Licença](#licença)

## Introdução

O projeto "Memórias do Tempo" visa proporcionar um sistema eficiente para o gerenciamento de produtos antigos da loja, permitindo ao administrador realizar operações CRUD (Create, Read, Update, Delete) de maneira intuitiva e segura.

## Requisitos do Sistema

### Funcionais
- Cadastro de produtos
- Atualização de produtos
- Visualização de produtos
- Exclusão de produtos

### Não Funcionais
- Segurança dos dados
- Performance e escalabilidade

### Tecnologias Utilizadas
- **Frontend:** HTML, CSS, JavaScript, React.js
- **Backend:** Node.js, Express.js
- **Banco de Dados:** MySQL

### Descrição das Tabelas
- **Tabela `Produtos`:**
  - Colunas: id, nome, descrição, ano, valor, imagem, etc.
- **Tabela `Categorias`:**
  - Colunas: id, nome
  - Relacionamento: muitos-para-muitos com `Produtos`

## Funcionalidades
- Página de listagem de produtos
- Página de cadastro de novos produtos
- Página de atualização de produtos
- Página de detalhes de produtos
- Funcionalidade de exclusão de produtos

## Equipe
- **Nome 1:** Função e responsabilidades
- **Nome 2:** Função e responsabilidades
- **Nome 3:** Função e responsabilidades
- **Nome 4:** Função e responsabilidades

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

