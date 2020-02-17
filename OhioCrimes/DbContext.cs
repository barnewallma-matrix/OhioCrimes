using Microsoft.EntityFrameworkCore;

namespace OhioCrimes
{
  public class DbContext : Microsoft.EntityFrameworkCore.DbContext
  {
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite("Filename=./ohiocrimes.db");
    }
  }

  public class Database
  {
    public static void Initalize()
    {
      using (var context = new DbContext())
      {
        DropTables(context);
        CreateTables(context);

        context.Database.CloseConnection();
      }

      void DropTables(DbContext context)
      {
        context.Database.ExecuteSqlCommand(@"
DROP TABLE IF EXISTS Population;
DROP TABLE IF EXISTS Crimes;
DROP TABLE IF EXISTS City;
DROP TABLE IF EXISTS Weapons;
DROP VIEW IF EXISTS WeaponsAsPercentageOfCrimes;
");
      }

      void CreateTables(DbContext context)
      {
        context.Database.ExecuteSqlCommand(@"
CREATE TABLE City
(
  Id INTEGER NOT NULL PRIMARY KEY,
  Name varchar(50) NOT NULL,
  State varchar(2) NOT NULL
);

CREATE TABLE Population
(
  Id INTEGER NOT NULL PRIMARY KEY,
  CityId INTEGER NOT NULL,
  Year INTEGER NOT NULL,
  Count INTEGER NOT NULL,
  FOREIGN KEY(CityId) REFERENCES City(Id)
);

CREATE TABLE Crimes
(
  Id INTEGER NOT NULL PRIMARY KEY,
  CityId INTEGER NOT NULL,
  Year INTEGER NOT NULL,
  Murder INTEGER NOT NULL,
  Rape INTEGER NOT NULL,
  Robbery INTEGER NOT NULL,
  AggravatedAssault INTEGER NOT NULL,
  PropertyCrime INTEGER NOT NULL,
  Burglary INTEGER NOT NULL,
  Larceny INTEGER NOT NULL,
  MotorVehicleTheft INTEGER NOT NULL,
  Arson INTEGER NOT NULL,
  ViolentCrime INTEGER NOT NULL,
  FOREIGN KEY(CityId) REFERENCES City(Id)
);

CREATE TABLE Weapons
(
  Id INTEGER NOT NULL PRIMARY KEY,
  Year INTEGER NOT NULL,
  Crime VARCHAR(10) NOT NULL,
  Firearms INTEGER NOT NULL,
  Knives INTEGER NOT NULL,
  OtherWeapons INTEGER NOT NULL,
  Unarmed INTEGER NOT NULL
);

CREATE VIEW WeaponsAsPercentageOfCrimes AS
SELECT Year,
       Crime,
       Firearms * 100.0 / (Firearms + Knives + OtherWeapons + Unarmed) AS Firearms,
       Knives * 100.0 / (Firearms + Knives + OtherWeapons + Unarmed) AS Knives,
       OtherWeapons * 100.0 / (Firearms + Knives + OtherWeapons + Unarmed) AS OtherWeapons,
       Unarmed * 100.0 / (Firearms + Knives + OtherWeapons + Unarmed) AS Unarmed
FROM Weapons
");
      }
    }
  }
}