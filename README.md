- [Portugês](#portugues)
- [English](#ingles)

# Sistema DinDin - gestão financeira {#portugues}

Desafio do módulo 3 do curso de Desenvolvimento de Software com foco em back-end da Cubos Academy refatorado após o fim do curso.

## Sobre o sistema

Trata-se de uma API RESTful utilizando express.js que permite cadastrar, alterar e deletar usuários, fazer login, cadastrar, listar, detalhar, alterar e deletar transações e obter um extrato de transações.

## Bibliotecas

- nodemon: ambiente de desenvolvimento;
- jsonwebtoken: criação de token;
- bcrypt: criação de hash para senhas;
- node-postgres: integração com o PostgreSQL;
- dotenv: carregar variáveis de ambiente;
- knex: query builder, tem suporte para migração de BD e previne SQL injection utilizando placeholders, além de facilitar a leitura e escrita do código ao abstrair o SQL.
- cors: habilitação de CORS (cross-origin resourse sharing);

## Rotas

### Usuários

`POST /usuario`  
Cria um novo usuário no sistema. Recebe um objeto com os seguintes dados obrigatórios no body:

_{  
 "name": "Carol",  
 "email": "carol@email.com",  
 "password": "123abc"  
}_

A senha é armazenada criptografada. Todos os campos devem ser strings. O e-mail não pode constar no cadastro de outro usuário.

Retorna ID, nome e e-mail do usuário cadastrado.

`POST /login`  
Recebe no body um objeto com email e senha. Ambos os dados devem ser strings e são obrigatórios.

_{  
 "email": "carol@email.com",  
 "password": "123abc"  
}_

Retorna ID, nome e e-mail do usuário logado e o bearer token com expiração em 6 horas.

**As rotas seguintes passam por validação de autenticação.**

`GET /usuario`  
Recebe o ID do usuário no bearer token e retorna ID, nome e e-mail do usuário logado.

`PUT /usuario`  
Altera os dados do usuário logado através do ID recebido no bearer token. Recebe no body um objeto com as seguintes informações:

_{  
 "name": "Carol",  
 "email": "carol@email.com",  
 "password": "123abc"  
}_

A senha é armazenada criptografada. Todos os campos devem ser strings. O e-mail pode continuar o mesmo ou ser alterado.

Retorna ID, nome e e-mail do usuário alterado.

`DELETE /usuario`  
Deleta a conta do usuário logado, recebendo o ID através do bearer token. Não recebe dados no body.

## Transações

_Em construção_

## Em breve

- Validação de senha para deletar a conta;
- Verificações de segurança da senha com mínimo de caracteres de diferentes tipos;
- Validação do formato do e-mail.

# DinDin System - Financial Management {#ingles} 
Refactoring of the Module 3 challenge from the Back-End Software Development course at Cubos Academy after the end of the course.  

## About the System
It is a RESTful API using express.js that allows user registration, modification, and deletion, login, registration, listing, detailing, modification, and deletion of transactions, and obtaining a transaction statement.  

## Libraries
nodemon: development environment;  
jsonwebtoken: token creation;  
bcrypt: hash creation for passwords;  
node-postgres: integration with PostgreSQL;  
dotenv: load environment variables;  
knex: query builder, supports DB migration and prevents SQL injection using placeholders, as well as making code reading and writing easier by abstracting SQL.  
cors: enabling CORS (cross-origin resource sharing);  

## Routes
### Users
`POST /usuario`
Creates a new user in the system. Receives an object with the following mandatory data in the body:

*{
"name": "Carol",
"email": "carol@email.com",
"password": "123abc"
}*

The password is stored encrypted. All fields must be strings. The email cannot be in another user's registration.  

Returns the ID, name, and email of the registered user.  

`POST /login`
Receives an object with email and password in the body. Both data must be strings and are mandatory.  

*{
"email": "carol@email.com",
"password": "123abc"
}*

Returns the ID, name, and email of the logged-in user and the bearer token with an expiration of 6 hours.  

The following routes go through authentication validation.

`GET /usuario`  
Receives the user ID in the bearer token and returns the ID, name, and email of the logged-in user.  

`PUT /usuario`  
Changes the data of the logged-in user through the ID received in the bearer token. Receives an object with the following information in the body:  

*{
"name": "Carol",
"email": "carol@email.com",
"password": "123abc"
}*

The password is stored encrypted. All fields must be strings. The email can remain the same or be changed.  

Returns the ID, name, and email of the altered user.  

`DELETE /usuario`
Deletes the account of the logged-in user, receiving the ID through the bearer token. Does not receive data in the body.

## Transactions
Under construction

## Coming Soon
- Password validation to delete the account;
- Password security checks with a minimum number of characters of different types;
- Email format validation;
- Unity and integration tests with jest;
