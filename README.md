# Sistema DinDin - gestão financeira

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
