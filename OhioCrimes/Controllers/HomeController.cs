using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhioCrimes.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;

namespace OhioCrimes.Controllers
{
  public class HomeController : Controller
  {
    [Route("")]
    public IActionResult Index(int year = 2017) => Crimes(year);

    [Route("/{year}/crimes", Name = "Crimes")]
    public IActionResult Crimes(int year)
    {
      var viewModel = LayoutViewModel.Load(year);
      return View("Crimes", viewModel);
    }

    [Route("/{year}/crimes-per-1000", Name = "CrimesPer1000")]
    public IActionResult CrimesPer1000(int year)
    {
      var viewModel = LayoutViewModel.Load(year);
      return View("CrimesPer1000", viewModel);
    }

    [Route("/{year}/weapons", Name = "Weapons")]
    public IActionResult Weapons(int year)
    {
      var viewModel = LayoutViewModel.Load(year);
      return View("Weapons", viewModel);
    }

    [Route("/{year}/weapons-as-percentage-of-crimes", Name = "WeaponsAsPercentageOfCrimes")]
    public IActionResult WeaponsAsPercentageOfCrimes(int year)
    {
      var viewModel = LayoutViewModel.Load(year);
      return View("WeaponsAsPercentageOfCrimes", viewModel);
    }

    [Route("/{year}/crimes-data", Name = "CrimesData")]
    public ActionResult CrimesData(int year)
    {
      var sql = @"
SELECT city.Name, crime.Murder, crime.Rape, crime.Robbery, crime.AggravatedAssault, crime.PropertyCrime, crime.Burglary, crime.Larceny, crime.MotorVehicleTheft, crime.Arson, crime.ViolentCrime
FROM Crimes crime
  INNER JOIN City city ON crime.CityId = city.Id
  INNER JOIN Population population ON city.Id = population.CityId AND population.Year = crime.Year
WHERE crime.Year = @year
ORDER BY population.Count DESC
LIMIT 20
";
      try
      {
        var rows = ExecuteSql(sql, year);
        var data = rows.Select(x => new
        {
          city = x[0],
          murder = x[1],
          rape = x[2],
          robbery = x[3],
          aggravatedAssault = x[4],
          propertyCrime = x[5],
          burglary = x[6],
          larceny = x[7],
          motorVehicleTheft = x[8],
          arson = x[9],
          violentCrime = x[10]
        });
        return new JsonResult(data.ToArray());
      }
      catch (Exception e)
      {
        return new JsonResult(new
        {
          error = e.Message
        });
      }
    }

    [Route("/{year}/crimes-per-1000-data", Name = "CrimesPer1000Data")]
    public ActionResult CrimesPer1000Data(int year)
    {
      var sql = @"
SELECT city.Name, crime.Murder, crime.Rape, crime.Robbery, crime.AggravatedAssault, crime.PropertyCrime, crime.Burglary, crime.Larceny, crime.MotorVehicleTheft, crime.Arson, crime.ViolentCrime
FROM CrimesPer1000 crime
  INNER JOIN City city ON crime.CityId = city.Id
  INNER JOIN Population population ON city.Id = population.CityId AND population.Year = crime.Year
WHERE crime.Year = @year
ORDER BY population.Count DESC
LIMIT 20
";
      try
      {
        var rows = ExecuteSql(sql, year);
        var data = rows.Select(x => new
        {
          city = x[0],
          murder = x[1],
          rape = x[2],
          robbery = x[3],
          aggravatedAssault = x[4],
          propertyCrime = x[5],
          burglary = x[6],
          larceny = x[7],
          motorVehicleTheft = x[8],
          arson = x[9],
          violentCrime = x[10]
        });
        return new JsonResult(data.ToArray());
      }
      catch (Exception e)
      {
        return new JsonResult(new { error = e.Message });
      }
    }

    [Route("/{year}/weapons-data", Name = "WeaponsData")]
    public ActionResult WeaponsData(int year)
    {
      var sql = @"
SELECT Crime, Firearms, Knives, OtherWeapons, Unarmed
FROM Weapons
WHERE Year = @year
";
      try
      {
        var rows = ExecuteSql(sql, year);
        var data = rows.Select(x => new
        {
          crime = x[0],
          firearms = x[1],
          knives = x[2],
          otherWeapons = x[3],
          unarmed = x[4]
        });
        return new JsonResult(data.ToArray());
      }
      catch (Exception e)
      {
        return new JsonResult(new { error = e.Message });
      }
    }

    [Route("/{year}/weapons-as-percentage-of-crimes-data", Name = "WeaponsAsPercentageOfCrimesData")]
    public ActionResult WeaponsAsPercentageOfCrimesData(int year)
    {
      var sql = @"
SELECT Crime, Firearms, Knives, OtherWeapons, Unarmed
FROM WeaponsAsPercentageOfCrimes
WHERE Year = @year
";
      try
      {
        var rows = ExecuteSql(sql, year);
        var data = rows.Select(x => new
        {
          crime = x[0],
          firearms = x[1],
          knives = x[2],
          otherWeapons = x[3],
          unarmed = x[4]
        });
        return new JsonResult(data.ToArray());
      }
      catch (Exception e)
      {
        return new JsonResult(new { error = e.Message });
      }
    }

    IEnumerable<object[]> ExecuteSql(string sql, int year)
    {
      var data = new List<object[]>();

      using (var context = new DbContext())
      {
        using (var command = context.Database.GetDbConnection().CreateCommand())
        {
          command.CommandText = sql;

          var parameter = command.CreateParameter();
          parameter.Value = year;
          parameter.ParameterName = "year";
          parameter.DbType = System.Data.DbType.Int32;
          command.Parameters.Add(parameter);

          context.Database.OpenConnection();
          DbDataReader reader = command.ExecuteReader();

          if (reader.HasRows)
          {
            while (reader.Read())
            {
              var values = new object[11];
              reader.GetValues(values);
              data.Add(values);
            }
          }
        }
      }

      return data;
    }
  }
}