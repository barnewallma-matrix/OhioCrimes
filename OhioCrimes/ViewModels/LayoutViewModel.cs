
namespace OhioCrimes.ViewModels
{
  public class LayoutViewModel
  {
    public int Year { get; set; }

    public static LayoutViewModel Load(int year)
    {
      return new LayoutViewModel
      {
        Year = year
      };
    }
  }
}
