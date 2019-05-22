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

select * from players;
-- insert into players (id_futbin,name,details,category,date_inserted) 
-- values (15,'Ramon', '{"imagem":"http://link.com"}','top',now());
select price,id_platform, "minutes" from prices where id_player = 23 and id_platform = 1;
-- drop table prices;
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

-- insert into prices (id_player,day,month,year,hour,minutes,id_platform,price,date_inserted) 
-- values (1,4,5,2019,13,54,2,15220.50,now());

-- select * from prices;

-- select
--         id_platform as "idPlatform",
--         name,
--         details
--         FROM platforms
--          WHERE  name = 'xbox';

