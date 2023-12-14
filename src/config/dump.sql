drop database dindin if exists;

create database dindin;

create table users (
	id serial primary key,
  name text not null,
  email text not null unique,
  password text not null
);

create table categories (
	id serial primary key,
  descrip text
);

create table transactions (
	id serial primary key,
	descrip text,
  ammount integer not null,
	date_transaction date not null,
	category_id integer references categorias(id),
	user_id	integer references users(id),
	type text not null
);


insert into categories 
(descrip)
values
('Alimentação'),('Assinaturas e Serviços'),
('Casa'),('Mercado'),('Cuidados Pessoais'),
('Educação'),('Família'),('Lazer'),('Pets'),
('Presentes'),('Roupas'),('Saúde'),
('Transporte'),('Salário'),
('Vendas'),('Outras receitas');





