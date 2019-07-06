	DROP SCHEMA public CASCADE;
	CREATE SCHEMA public;
	
	-- DROP TABLE platforms;
	CREATE TABLE platforms (
	    id_platform SERIAL,
	    name text NOT NULL,
	    details json NOT NULL,
	    date_inserted timestamptz NOT null,
	    PRIMARY KEY (id_platform)
	);
	-- select * from platforms;
	insert into platforms (name,details,date_inserted) values ('xbox','{}', now());
	insert into platforms (name,details,date_inserted) values ('ps4','{}', now());
	insert into platforms (name,details,date_inserted) values ('origin','{}', now());
	
	
	-- DROP TABLE players;
	CREATE TABLE players (
	    id_player SERIAL,
	    id_futbin int unique,
	    name text NOT NULL,
	    details json NOT NULL,
	    category text not null,
	    date_inserted timestamptz NOT null,
	    PRIMARY KEY (id_player)
	);
	
	CREATE table prices (
		id_price serial not null,
		id_player int not null,
		day int not null,
		month int not null,
		year int not null,
		hour int not null,
		minutes int not null,
		id_platform int not null,
		price int not null,
		date_inserted timestamptz NOT null,
		constraint prices_idplayer_player_id_fkey foreign key (id_player) REFERENCES players (id_player),
		constraint platform_player_id_fkey foreign key (id_platform) REFERENCES platforms (id_platform)
	);
	
CREATE TABLE users (
	id_user serial NOT NULL,
	name text NOT NULL,
	login text NOT NULL,
	password text NULL,
	details jsonb NULL,
	date_inserted timestamptz NOT null,
	CONSTRAINT users_pk PRIMARY KEY (id_user))WITH (OIDS=FALSE) ;

INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Alex Sandro Roschildt Pinto', 'alex.sandro','116f59880cbfcd48d71ad0392e45a16074a3eb3a2423e262f6c11dd6a9a567a3', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Alfeu Gonçalves dos Santos', 'alfeu.goncalves','1ab54846148574723bafc34f4c8218d00578bb8887799963f55e79038aa094fc', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Allison de Souza', 'allison.souza','f5e73ea048296be1f2b8ea730d1c983ff1aa1f50c3f4088bc4f8aa13879d02a6', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Ana Elisa Kruger', 'ana.elisa','05462a10af01fc6c582e9c1a4c4498d4b2a1aa8d2d1c8f37d2f6bb27170a09f8', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('André Carvalho Machado', 'andre.carvalho','080db2fb1b8b87b78c872e1a39637637559d738b0e45966ba832172ab9d60186', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Arthur Seabra', 'arthur.seabra','fcc39ac0f7d877042b7713794d1e6fb591135056339e2d8084924c2a8a70f237', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Caetano Sasia dos Santos', 'caetano.sasia','f49de99820177aab9480f60cf90b137a3cf23474d3a191c8921041f9559e893a', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Cauê Baasch de Souza', 'caue.baasch','ef595ee499883a6ff32d1ab421e961fac3de095ba05ecb4b100e84126d0f5a3c', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Fabiana Schwarz', 'fabiana.schwarz','effa6af9e3eb9bfa7c497b6910fb7198ee65760e599edcc7adc8988ab17151e4', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Felipe Neves Dias', 'felipe.neves','13cc45e0fc141af19e950bf3fd9f0707847e0b6cf6c654e81a4f5ba90667d564', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Gabriel Donadel Dall Agnol', 'gabriel.donadel','78c3d8520858c80f000996bf0fe6d67d7e6bcba9ae855d4b03609faedbb880e1', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Gilmar Douglas Baray de Souza', 'gilmar.douglas','3ab00a6b07edad1885e16fb793438a05683f47689d8af80ea149e3199c5cb148', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Heitor Felippe Dela Vedova Murara', 'heitor.felipe','a5fd2f6ed8a9f9437527d3ec65d982c8d1267d5653556e55415364e0e098c829', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Joao Pedro Brognoli', 'joao.pedro','6d803d63301cd7a8733364a2099dba40da99b79e02a13779cc4f54493251b034', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('José Augusto da França', 'jose.augusto','9902916240c90ee045e2156d099e67bad51656577877d94b19eac613fdf02138', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Laís Ferrigo Perazzolo', 'lais.ferrigo','7326d7ae86388d048a9f27d1d2019835dce78c4bad2ec685dcd4c0fb26edcc2f', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Lígia Sell', 'ligia.sell','c30ac32c037f70d8b8dde5a1f2e901eb4ca4a82fc7049f167df985d650ac4a2e', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Lucas Pereira Feliciano', 'lucas.pereira','8390bb47cd394a0c8f49c465cb912fd121bc781d676847a15e890dd05734507f', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Luiz Fernando de Souza', 'luiz.fernando','7d87f31a8acd6e5e8d9b30f91c3dc025106b9509da9d3a0abbab6bc84dac2e89', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Luiz Fernando Schiestl Alexandre', 'luiz.schiestl','8bd0f7d96a81660a1a8c912a7d298412e5b763e551a1b6318f8222c65d9269bb', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Luiz Guilherme Xavier dos Santos Muraro', 'luiz.guilherme','2804d603a91139368bac57dc37e58a65364447d421e573ef016dcb3dab6a70af', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Marcos Vinicius Agnoletto Silva', 'marcos.vinicius','69d1816c177496910e45b65fd7d02794fad6713c39989be1e00da2a08ca25cc9', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Matheus Alberto Pereira', 'matheus.alberto','7faab9edef6bd7295bbffa665e0fd331f9d30392297008d557d069d9e71f343c', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Pedro Augusto Freddi Rodrigues', 'pedro.augusto','a3ff0a9f3dfb1638f13f2eff044a4fdb1d09f707b403b94dfc356bfa16565297', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Ramon Victor', 'ramon.victor','cb7fcdd51aa0623013ed7ac3b666672b100ac08de7d0de22e88a0210eea9fae9', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Rodolfo Dartora da Silva', 'rodolfo.dartora','0db07009f28f5d674f27280d620c8a10a5503e049260f2cb98b5322427ca44dd', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Vinícius Soares Laghi', 'vinicius.soares','192bffa1f2c9b8e5496dbd2ff3cd0cff2eb608d5fc8935d551760327ce667cdd', '{}', now());
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Vitor Patricio Chaves', 'vitor.patricio','af0992f0798115114c6ad62e1aa1ec461a8a77887923e3bdd47d8655e72a8c8c', '{}', now());


CREATE TABLE wallets (
	id_buy serial NOT NULL,
	id_user int NOT NULL,
	id_player int NOT NULL,
	id_platform int NOT NULL,
	price int not null,
	date_inserted timestamptz NOT NULL,
	details jsonb NULL,
	constraint wallets_id_user_fkey foreign key (id_user) REFERENCES users (id_user),
	constraint wallets_id_player foreign key (id_player) REFERENCES players (id_player),
	constraint wallets_id_platform foreign key (id_platform) REFERENCES platforms (id_platform),
	CONSTRAINT buy_pk PRIMARY KEY (id_buy))WITH (OIDS=FALSE) ;

--INSERT INTO wallets (id_user,id_player,id_platform,price,date_inserted,details) values (25,24,1,1500,now(),'{}');
	
	--select * from analyzed where id_platform = 1 and day = 12 and "month" = 6 and "year" = 2019
	-- INSERT INTO analyzed (id_player, id_platform,) VALUES ();
	   --SELECT * FROM analyzed
	   create table analyzed (
	   	id_player int not NULL,
	   	id_platform int NOT NULL,
	   	last_price int not null,
	   	lower_price_last_day int not null,
	   	higher_price_last_day int not null,
	   	variation_low_price double precision not null,
	   	variation_high_price double precision not null,
	   	day int not null,
		month int not null,
		year int not null,
	   	date_inserted timestamptz NOT null,
	   	constraint analyzed_id_player foreign key (id_player) REFERENCES players (id_player),
	   	constraint analyzed_id_platform foreign key (id_platform) REFERENCES platforms (id_platform)
	   	) WITH (OIDS=FALSE);
	   	
	--INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Ramon Victor', 'ramon.victor','cb7fcdd51aa0623013ed7ac3b666672b100ac08de7d0de22e88a0210eea9fae9', '{}', now());   
	--INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Caetano Sasia', 'caetano.sasia','f49de99820177aab9480f60cf90b137a3cf23474d3a191c8921041f9559e893a', '{}', now());   


-- 	update  analyzed 
-- 	set variation_low_price = 45,
--         variation_high_price = -14.47,
--        lower_price_last_day = 11.82,
--             higher_price_last_day = 13.82
-- where 
-- 	id_player = 1 and id_platform = 1 and day = 17 and month = 6 and year = 2019;

-- UPDADE  analyzed 
--          SET
--             variation_low_price = 0,
--             variation_high_price = 14.47,
--             lower_price_last_day = 1182,
--             higher_price_last_day = 1382
--         WHERE 
--             id_player = 1 and id_platform = 2 and "day" = 17 and "month" = 7 and "year" = 2019;"



	--BEGIN transaction
	--commit transaction
	--SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
	--insert into users (name,login,password,details,date_inserted) values ('Ramon Victor','ramon.victor','ramon','{}', now())Player",
	--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())
	--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())
	--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())
	--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())om date_inserted)*1000 as "dateInserted" ;
	--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())
	--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())