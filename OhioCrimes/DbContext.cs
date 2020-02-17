using Microsoft.EntityFrameworkCore;

namespace OhioCrimes
{
  public class DbContext :  Microsoft.EntityFrameworkCore.DbContext
  {
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite("Filename=./ohiocrimes.db");
    }
  }
}