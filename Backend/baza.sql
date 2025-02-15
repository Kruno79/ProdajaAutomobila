SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_ab2d4d_prodajaautomobila SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_ab2d4d_prodajaautomobila COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_ab2d4d_prodajaautomobila SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

CREATE TABLE automobili (
  sifra int not null primary key identity(1,1),
  marka VARCHAR(50) not null,
  model VARCHAR(50) not null,
  motor VARCHAR(50),
  vin VARCHAR(17),
  godiste INT,
  kilometraza INT
);

CREATE TABLE otkupi (
 sifra int not null primary key identity(1,1),
  automobil INT not null,
  cijena DECIMAL(10,2) not null,
  datum DATE not null,
  prodavatelj VARCHAR(100) not null,
  FOREIGN KEY (automobil) REFERENCES automobili(sifra)
);

CREATE TABLE dorade (
  sifra int not null primary key identity(1,1),
  otkup INT not null,
  cijena_dijelova DECIMAL(10,2) not null,
  cijena_rada DECIMAL(10,2) not null,
  FOREIGN KEY (otkup) REFERENCES otkupi(sifra)
);

CREATE TABLE prodaja (
  sifra int not null primary key identity(1,1),
  dorada INT not null,
  cijena DECIMAL(10,2) not null,
  FOREIGN KEY (dorada) REFERENCES dorade(sifra)
);


insert into automobili (marka,model,motor,vin,godiste,kilometraza) values
('Renault','Scenic','15dci','VF1JZ0A0643508580',2010,223017);

insert into otkupi(automobil,cijena,datum,prodavatelj) values
(1,3000,'2024-12-09','Ivan Horvat');

insert into dorade (otkup,cijena_dijelova,cijena_rada) values
(1, 500, 300);

insert into prodaja (dorada,cijena) VALUES 
(1, 4300);

insert into automobili (marka,model,motor,vin,godiste,kilometraza) values
('Opel','Meriva','13cdti','W0LSH9EB4B4227982',2010,223017);

insert into otkupi(automobil,cijena,datum,prodavatelj) values
(1,3100,'2024-11-19','Mario Matas');

insert into dorade (otkup,cijena_dijelova,cijena_rada) values
(1, 500, 450);

insert into prodaja (dorada,cijena) VALUES 
(1, 4400);
insert into automobili (marka,model,motor,vin,godiste,kilometraza) values
('Opel','Astra','16cdti','W0L0JBF38B6224554',2010,223017);

insert into otkupi(automobil,cijena,datum,prodavatelj) values
(1,5000,'2024-05-09','Petar Horvat');

insert into dorade (otkup,cijena_dijelova,cijena_rada) values
(1, 1500, 1000);

insert into prodaja (dorada,cijena) VALUES 
(1, 8000);