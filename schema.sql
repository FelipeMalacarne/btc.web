create table account (
	acc_id serial not null,
	acc_name varchar(255) not null,
	acc_cpf varchar(15) not null,
	acc_email varchar(150) not null,
	acc_password varchar(100) not null,
	constraint pk_acc_id primary key(acc_id)
);
create table job (
	job_id serial not null,
	job_name varchar(255) not null,
	constraint pk_job_id primary key(job_id)
);
create table account_job (
	acc_job_id serial not null,
	acc_id integer not null,
	job_id integer not null,
	constraint pk_acc_job_id primary key(acc_job_id)
);
create table sale (
	sale_id serial not null,
	sale_time timestamp,
	sale_total decimal(10,2),
	acc_id integer not null,
	constraint pk_sale_id primary key(sale_id)
);
create table category(
	cat_id serial not null,
	cat_name varchar(255) not null,
	constraint pk_cat_id primary key(cat_id)
);
create table product(
	prod_id serial not null,
	prod_name varchar(255) not null,
	prod_description text,
	prod_price numeric(10,2) not null,
	prod_active boolean not null,
	constraint pk_prod_id primary key(prod_id)
);
create table product_category(
	prod_cat_id serial not null,
	prod_id integer not null,
	cat_id integer not null,
	constraint pk_prod_cat_id primary key(prod_cat_id )
);
create table sale_product(
	sale_prod_id serial not null,
	sale_prod_amount integer not null,
	sale_id integer not null,
	prod_id integer not null,
	constraint pk_sale_prod_id primary key(sale_prod_id)
);
create table unit (
	un_id serial not null,
	un_name varchar(255) not null,
	un_symbol varchar(4) not null,
	constraint pk_un_id primary key (un_id)
);	
create table ingredient (
	ing_id serial not null,
	ing_name varchar (255) not null,
	ing_min decimal (10,2) not null,
	ing_max decimal (10,2) not null,
	un_id integer not null,
	constraint pk_ing_id primary key (ing_id)
);
create table product_ingredient (
	prod_ing_id serial not null,
	prod_ing_amount decimal (10,2),
	prod_id integer not null,
	ing_id integer not null,
	constraint pk_prod_ing_id primary key (prod_ing_id)
);
create table entry_ingredient (
	entry_id serial not null,
	entry_amount decimal (10,2) not null,
	entry_date timestamp not null,
	entry_expiration_date timestamp,
	ing_id integer not null,
	acc_id integer not null,
	constraint pk_entry_id primary key (entry_id)
);
create table leave_ingredient (
	leave_id serial not null,
	leave_amount decimal (10,2) not null,
	leave_date timestamp not null,
	ing_id integer not null,
	acc_id integer not null,
	constraint pk_leave_id primary key (leave_id)
);
create table stock(
	stock_id serial not null,
	stock_amount decimal (10,2) not null,
	ing_id integer not null,
	constraint pk_stock_id primary key(stock_id)
);

create table notification(
	noti_id serial not null,
	noti_title varchar(255) not null,
	noti_message text not null,
	noti_date timestamp not null,
	constraint pk_noti_id primary key(noti_id)
);



/**
* Alter table fks
*/
alter table account_job add constraint fk_acc_id foreign key(acc_id) references account (acc_id);
alter table account_job add constraint fk_job_id foreign key(job_id) references job (job_id);
alter table sale_product add constraint fk_sale_id foreign key(sale_id) references sale (sale_id);
alter table sale_product add constraint fk_prod_id foreign key(prod_id) references product (prod_id);
alter table sale add constraint fk_acc_id foreign key(acc_id) references account (acc_id);
alter table ingredient add constraint fk_un_id foreign key(un_id) references unit (un_id);
ALTER TABLE product_ingredient ADD CONSTRAINT fk_ing_id FOREIGN KEY (ing_id) REFERENCES ingredient (ing_id) ON DELETE CASCADE;
--alter table product_ingredient add constraint fk_ing_id foreign key(ing_id) references ingredient (ing_id);
alter table product_ingredient add constraint fk_prod_id foreign key(prod_id) references product (prod_id);
alter table product_category add constraint fk_prod_id foreign key(prod_id) references product (prod_id);
alter table product_category add constraint fk_cat_id foreign key(cat_id) references category (cat_id);
alter table entry_ingredient add constraint fk_ing_id foreign key(ing_id) references ingredient (ing_id);
alter table entry_ingredient add constraint fk_acc_id foreign key(acc_id) references account (acc_id);
alter table leave_ingredient add constraint fk_ing_id foreign key(ing_id) references ingredient (ing_id);
alter table leave_ingredient add constraint fk_acc_id foreign key(acc_id) references account (acc_id);
alter table stock add constraint fk_ing_id foreign key(ing_id) references ingredient (ing_id);


/**
* Insert Jobs
*
*/
INSERT INTO job(job_name) VALUES('ROLE_USER');
INSERT INTO job(job_name) VALUES('ROLE_MODERATOR');
INSERT INTO job(job_name) VALUES('ROLE_ADMIN');
/**
* Insert TestUsers
* Senha: 12345678!
*
*/
INSERT INTO account(acc_name, acc_cpf, acc_email, acc_password) VALUES
('FelipeMalacarne', 12345678910, 'felipemalacarne@email.com','$2a$10$ZvLF68x11XT3CsPlYfPECeePiHhVW4r5mDKCOiFqdnukXWNqUQm/m'),
('FelipeJulhão', 12345678911, 'felipeJulhão@email.com','$2a$10$zb2mqA/.YN6D7HyygAi5b.amDa6TQcQEREVmOnLGTBgQ3CxNO3iLG'),
('Mateus', 12345678912, 'mateus@email.com', '$2a$10$SYAPaqv2.sC/2Wvp5rPvzObtC1lIkQ2qhc1Ooj2dWq1uJUKEKk8BG'),
('Luiz', 12345678913, 'luiz@email.com', '$2a$10$raNPGCDJ0mjZDpHG4Meu6eYaNdCVurT7p.ZE4SBuG9I4U5YxMlWjG'),
('Jorge', 12345678914, 'jorge@email.com', '$2a$10$etsboYs7988s6ZHflXS6KOt3cvb2Ppaa4m5rK76aRHMJXksIAWiLi'),
('Sergio', 12345678915, 'sergio@email.com', '$2a$10$vmRlO9o8WOjmed/pMH8Ej.RRqKxEPqYF9K5DAScQJoQj.zIxHizDK');
INSERT INTO account_job(acc_id, job_id) VALUES
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 2),
(6, 1);

/**
* Insert Categories
*
*/
INSERT INTO category(cat_name) VALUES('FOOD');
INSERT INTO category(cat_name) VALUES('DRINK');
/**
* Insert Units
*
*/
INSERT INTO unit(un_name, un_symbol) VALUES('Quilogramas', 'kg'); 
INSERT INTO unit(un_name, un_symbol) VALUES('Gramas', 'g');
INSERT INTO unit(un_name, un_symbol) VALUES('Litros', 'L');
INSERT INTO unit(un_name, un_symbol) VALUES('Mililitros', 'mL');
INSERT INTO unit(un_name, un_symbol) VALUES('Unidade', 'un');

/**
* Insert Products
*
*/
INSERT INTO product(prod_name, prod_description, prod_price, prod_active) values
('Batata Rústica Inteira', 'Batata previamente cozida, frita e temperada com sal e pimenta preta. Acompanha maionese caseira.', 21.50, true),
('Batata Rústica Meia', 'Batata previamente cozida, frita e temperada com sal e pimenta preta. Acompanha maionese caseira.', 16.50, true),
('Filé de Tilápia Inteira', 'Iscas de tilápia empanadas. Acompanha molho tártaro e limão.', 56.50, true),
('Filé de Tilápia Meia', 'Iscas de tilápia empanadas. Acompanha molho tártaro e limão.', 35.00, true),
('Porção de Hambúrgueres Barbecue Inteira', 'Pão, hambúrguer (80g), mussarela, cebola no shoyu e molho barbecue. (4 unidades + fritas)', 45.50, true),
('Porção de Hambúrgueres Barbecue Meia', 'Pão, hambúrguer (80g), mussarela, cebola no shoyu e molho barbecue. (2 unidades + fritas)', 29.50, true),
('Porção de Hambúrgueres Cheddar Inteira', 'Pão, hambúrguer (80g), mussarela, molho cheddar, cebola no shoyu, alface e tomate. (4 unidades + fritas)', 53.50, true),
('Porção de Hambúrgueres Cheddar Meia', 'Pão, hambúrguer (80g), mussarela, molho cheddar, cebola no shoyu, alface e tomate. (2 unidades + fritas)', 33.50, true),
('Porção de Hambúrgueres Gorgonzola Inteira', 'Pão, hambúrguer (80g), mussarela, molho gorgonzola, cebola roxa, alface e tomate. (4 unidades + fritas)', 53.50, true),
('Salada Italiana', 'Rúcula, tomate seco, queijo parmesão, croutons e redução de balsâmico.', 35.00, true),
('Salada Summer', 'Alface, cenoura, tomate cereja, croutons e redução de balsâmico.', 32.00, true),
('Caipirinha de Morango', 'Vodka, morango, açúcar e gelo.', 16.00, true),
('Caipirinha de Limão', 'Vodka, limão, açúcar e gelo.', 16.00, true),
('Caipirinha de Kiwi', 'Vodka, kiwi, açúcar e gelo.', 16.00, true),
('Drink Safira', 'Vodka, limão, açúcar, xarope de curaçau, suco de laranja e gelo.', 22.00, true),
('Caipirinha John Lemon', 'Cachaça ouro, limão, açúcar, espuma de gengibre e gelo.', 20.00, true),
('Drink Turquesa', 'Gin, xarope de curaçau, limão, água tônica e gelo', 22.00, false);
/**
* Insert Products 
* Categories
*/
INSERT INTO product_category (prod_id, cat_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2);
/**
* Insert Ingredients 
* 
*/
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Batata', 2, 1000, 50000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Tilápia', 2, 1000, 30000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Carne moída', 2, 1000, 30000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Pão de hambúrguer', 5, 15 , 100);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Queijo Mussarela', 2, 1000, 8000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Queijo Cheddar', 2, 1000, 9000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Queijo Gorgonzola', 2, 1000, 10000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Cebola roxa', 5, 20, 50);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Alface', 5, 20, 50);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Tomate', 5, 20, 50);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Rúcula', 2, 1000, 5000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Queijo parmesão', 2, 1000, 5000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Molho Shoyu', 4, 1000, 15000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Molho Balsâmico', 4, 1000, 15000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Cenoura', 2, 1000, 16000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Tomate Cereja', 2, 1000, 16000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Maionese', 2, 1000, 16000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Limão', 5, 20, 70);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Morango', 5, 20, 50);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Kiwi', 5, 20, 50);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Vodka', 4, 1000, 15000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Gin', 4, 1000, 15000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Cachaça', 4, 1000, 15000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Xarope de curaçau', 4, 1000, 15000);
INSERT INTO ingredient(ing_name, un_id, ing_min, ing_max) VALUES ('Suco de laranja', 4, 1000, 15000);

/**
* Insert ProductIngrendient 
* 
*/
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (500, 1, 1); 
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (250, 2, 1);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (500, 3, 2);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (100, 3, 17);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (1, 3, 18);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (250, 4, 2);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (75, 4, 17);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (1, 4, 18);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (320, 5, 3);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (2, 5, 8);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (100, 5, 5);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (100, 5, 13);

INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (250, 6, 1);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (75, 6, 17);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (1, 6, 18);

INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (640, 7, 3);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (4, 7, 8);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (200, 7, 5);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (200, 7, 13);

INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (500, 8, 3);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (4, 8, 8);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (200, 8, 5);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (200, 8, 13);

INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (640, 9, 3);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (4, 9, 8);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (200, 9, 9);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (200, 9, 13);

INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (100, 10, 11);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (50, 10, 12);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (30, 10, 13);

INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (80, 11, 14);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (50, 11, 15);
INSERT INTO product_ingredient(prod_ing_amount, prod_id, ing_id) VALUES (30, 11, 16);


/**
* Insert Stock 
* 
*/
INSERT INTO stock(stock_amount, ing_id) VALUES (10000, 1);
INSERT INTO stock(stock_amount, ing_id) VALUES (50000, 2);
INSERT INTO stock(stock_amount, ing_id) VALUES (50000, 3);
INSERT INTO stock(stock_amount, ing_id) VALUES (50000, 4);
INSERT INTO stock(stock_amount, ing_id) VALUES (50000, 5);
INSERT INTO stock(stock_amount, ing_id) VALUES (50000, 6);
INSERT INTO stock(stock_amount, ing_id) VALUES (50000, 7);
INSERT INTO stock(stock_amount, ing_id) VALUES (60, 8);
INSERT INTO stock(stock_amount, ing_id) VALUES (60, 9);
INSERT INTO stock(stock_amount, ing_id) VALUES (60, 10);
INSERT INTO stock(stock_amount, ing_id) VALUES (2000, 11);
INSERT INTO stock(stock_amount, ing_id) VALUES (4000, 12);
INSERT INTO stock(stock_amount, ing_id) VALUES (2000, 13);
INSERT INTO stock(stock_amount, ing_id) VALUES (2000, 14);
INSERT INTO stock(stock_amount, ing_id) VALUES (20, 15);
INSERT INTO stock(stock_amount, ing_id) VALUES (1000, 16);
INSERT INTO stock(stock_amount, ing_id) VALUES (1000, 17);
INSERT INTO stock(stock_amount, ing_id) VALUES (100, 18);
INSERT INTO stock(stock_amount, ing_id) VALUES (100, 19);
INSERT INTO stock(stock_amount, ing_id) VALUES (100, 20);
INSERT INTO stock(stock_amount, ing_id) VALUES (10000, 21);
INSERT INTO stock(stock_amount, ing_id) VALUES (10000, 22);
INSERT INTO stock(stock_amount, ing_id) VALUES (10000, 23);
INSERT INTO stock(stock_amount, ing_id) VALUES (1000, 24);
INSERT INTO stock(stock_amount, ing_id) VALUES (3000, 25);
/**
Insert Sales
*/
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2022-11-01 12:00:00', 20.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2022-11-02 12:00:00', 30.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2022-11-03 12:00:00', 40.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2022-12-15 10:30:00', 20.00, 2);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2022-12-28 15:45:00', 30.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-01-10 09:20:00', 40.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-02-05 14:10:00', 25.00, 3);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-02-18 11:30:00', 35.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-03-03 16:25:00', 50.00, 2);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-03-18 13:40:00', 30.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-04-02 10:15:00', 45.00, 3);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-04-17 14:55:00', 55.00, 2);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-05-01 12:00:00', 40.00, 2);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-05-16 16:30:00', 60.00, 2);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2022-11-15 09:30:00', 25.00, 2);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2022-11-28 14:45:00', 35.00, 3);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2022-12-03 10:20:00', 45.00, 2);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2022-12-12 12:10:00', 30.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-01-05 15:30:00', 55.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-01-18 10:50:00', 40.00, 2);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-02-02 14:25:00', 60.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-02-15 12:40:00', 50.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-03-01 11:15:00', 30.00, 2);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-03-16 15:55:00', 35.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-04-01 12:00:00', 45.00, 1);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-04-14 14:30:00', 40.00, 2);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-05-02 09:45:00', 55.00, 3);
INSERT INTO sale(sale_time, sale_total, acc_id) VALUES ('2023-05-18 11:20:00', 60.00, 1);
/**
Insert LeaveIngredients
*/
INSERT INTO leave_ingredient(leave_amount, leave_date, ing_id, acc_id) VALUES (200, '2023-05-01', 8, 1);
INSERT INTO leave_ingredient(leave_amount, leave_date, ing_id, acc_id) VALUES (100, '2023-05-02', 17, 2);
INSERT INTO leave_ingredient(leave_amount, leave_date, ing_id, acc_id) VALUES (200, '2023-05-03', 14, 3);
INSERT INTO leave_ingredient(leave_amount, leave_date, ing_id, acc_id) VALUES (100, '2023-05-04', 11, 4);
INSERT INTO leave_ingredient(leave_amount, leave_date, ing_id, acc_id) VALUES (200, '2023-05-05', 9, 1);
INSERT INTO leave_ingredient(leave_amount, leave_date, ing_id, acc_id) VALUES (100, '2023-05-06', 16, 2);
INSERT INTO leave_ingredient(leave_amount, leave_date, ing_id, acc_id) VALUES (200, '2023-05-07', 13, 3);
INSERT INTO leave_ingredient(leave_amount, leave_date, ing_id, acc_id) VALUES (100, '2023-05-08', 11, 4);
INSERT INTO leave_ingredient(leave_amount, leave_date, ing_id, acc_id) VALUES (200, '2023-05-09', 7, 1);
INSERT INTO leave_ingredient(leave_amount, leave_date, ing_id, acc_id) VALUES (100, '2023-05-10', 19, 1);
/**
Insert EntryIngredients
*/
INSERT INTO entry_ingredient(entry_amount, entry_date, entry_expiration_date, ing_id, acc_id) 
VALUES (200, '2023-05-01', '2023-06-01', 8, 1);
INSERT INTO entry_ingredient(entry_amount, entry_date, entry_expiration_date, ing_id, acc_id)
VALUES (100, '2023-05-02', '2023-06-02', 17, 2);
INSERT INTO entry_ingredient(entry_amount, entry_date, entry_expiration_date, ing_id, acc_id)
VALUES (200, '2023-05-03', '2023-06-03', 14, 3);
INSERT INTO entry_ingredient(entry_amount, entry_date, entry_expiration_date, ing_id, acc_id)
VALUES (100, '2023-05-04', '2023-06-04', 11, 4);
INSERT INTO entry_ingredient(entry_amount, entry_date, entry_expiration_date, ing_id, acc_id)
VALUES (200, '2023-05-05', '2023-06-05', 9, 1);
INSERT INTO entry_ingredient(entry_amount, entry_date, entry_expiration_date, ing_id, acc_id)
VALUES (100, '2023-05-06', '2023-06-06', 16, 2);
INSERT INTO entry_ingredient(entry_amount, entry_date, entry_expiration_date, ing_id, acc_id)
VALUES (200, '2023-05-07', '2023-06-07', 13, 3);
INSERT INTO entry_ingredient(entry_amount, entry_date, entry_expiration_date, ing_id, acc_id)
VALUES (100, '2023-05-08', '2023-06-08', 11, 4);
INSERT INTO entry_ingredient(entry_amount, entry_date, entry_expiration_date, ing_id, acc_id)
VALUES (200, '2023-05-09', '2023-06-09', 7, 1);
INSERT INTO entry_ingredient(entry_amount, entry_date, entry_expiration_date, ing_id, acc_id)
VALUES (100, '2023-05-10', '2023-06-10', 19, 1);









