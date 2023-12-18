drop database dindin;

create database dindin;

create table users (
	id serial primary key,
  name text not null,
  email text not null unique,
  password text not null
);

create table categories (
	id serial primary key,
  descrip text,
	id_user integer references users(id) null
);

create table type_transaction (
	id serial primary key,
	type_transaction varchar(10) not null
)

create table transactions (
	id serial primary key,
	descrip text,
  ammount integer not null,
	date_transaction date not null,
	category_id integer references categories(id),
	user_id	integer references users(id),
	type_transaction integer references type(id)
);

insert into type_transaction  
(type_transaction) values
('entrada'), ('saida')


insert into categories 
(descrip)
values
('Alimentação'),('Assinaturas e Serviços'),
('Casa'),('Mercado'),('Cuidados Pessoais'),
('Educação'),('Família'),('Lazer'),('Pets'),
('Presentes'),('Roupas'),('Saúde'),
('Transporte'),('Salário'),
('Vendas'),('Outras receitas');





