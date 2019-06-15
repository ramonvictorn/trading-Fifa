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
select * from users;
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Ramon Victor', 'ramon.victor','cb7fcdd51aa0623013ed7ac3b666672b100ac08de7d0de22e88a0210eea9fae9', '{}', now());   
INSERT INTO users (name,login, password,details, date_inserted) VALUES ('Caetano Sasia', 'caetano.sasia','f49de99820177aab9480f60cf90b137a3cf23474d3a191c8921041f9559e893a', '{}', now());   

CREATE TABLE users_players (
    id_buy serial NOT NULL,
    id_user int NOT NULL,
    id_player int NOT NULL,
    id_platform int NOT NULL,
    price int not null,
    date_inserted timestamptz NOT NULL,
    details jsonb NULL,
    constraint users_players_id_user_fkey foreign key (id_user) REFERENCES users (id_user),
    constraint users_players_id_player foreign key (id_player) REFERENCES players (id_player),
    constraint users_players_id_platform foreign key (id_platform) REFERENCES platforms (id_platform),
    CONSTRAINT buy_pk PRIMARY KEY (id_buy))WITH (OIDS=FALSE) ;
   
--select * from analyzed where id_platform = 1 and day = 12 and "month" = 6 and "year" = 2019
-- INSERT INTO analyzed (id_player, id_platform,) VALUES ();
   --SELECT * FROM analyzed
   create table analyzed (
   	id_player int not NULL,
   	id_platform int NOT NULL,
   	last_price int not null,
   	lower_price_last_day int not null,
   	higher_price_last_day int not null,
   	variation_low_price int not null,
   	variation_high_price int not null,
   	day int not null,
	month int not null,
	year int not null,
   	date_inserted timestamptz NOT null,
   	constraint analyzed_id_player foreign key (id_player) REFERENCES players (id_player),
   	constraint analyzed_id_platform foreign key (id_platform) REFERENCES platforms (id_platform)
   	) WITH (OIDS=FALSE);
   	
   


--insert into users (name,login,password,details,date_inserted) values ('Ramon Victor','ramon.victor','ramon','{}', now())Player",
--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())
--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())
--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())
--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())om date_inserted)*1000 as "dateInserted" ;
--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())
--insert into users (name,login,password,details,date_inserted) values ('Ramon','ramon','ramon','{}', now())