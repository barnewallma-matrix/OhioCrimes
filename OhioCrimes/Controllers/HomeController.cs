using Microsoft.AspNetCore.Mvc;

namespace OhioCrimes.Controllers
{
  public class HomeController : Controller
  {
    [Route("")]
    public IActionResult Index()
    {
      return Content("");
    }
  }
}