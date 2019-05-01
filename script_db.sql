DROP TABLE players;
CREATE TABLE players (
    id_player SERIAL,
    id_futbin int,
    name text NOT NULL,
    details json NOT NULL,
    category text not null,
    date_inserted timestamptz NOT null,
    PRIMARY KEY (id_player)
);

select * from players;
insert into players (id_futbin,name,details,category,date_inserted) 
values (13,'Neymar', '{}','top',now());

drop table prices;
CREATE table prices (
	id_player serial not null,
	day int not null,
	month int not null,
	year int not null,
	hour int not null,
	minutes int not null,
	platform text not null,
	price int not null,
	date_inserted timestamptz NOT null,
	constraint prices_idplayer_player_id_fkey foreign key (id_player) REFERENCES players (id_player)
);

select * from prices;


