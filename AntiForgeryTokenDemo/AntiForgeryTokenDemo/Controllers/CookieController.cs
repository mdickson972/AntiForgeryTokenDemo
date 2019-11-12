using Microsoft.AspNetCore.Mvc;

namespace AntiForgeryTokenDemo.Controllers
{
    [AutoValidateAntiforgeryToken]
    public class CookieController : Controller
    {
        [HttpGet]
        public IActionResult Cookie() => View();

        [HttpGet]
        public IActionResult Generate() => View("Cookie");

        [HttpPost]
        public string Test() => "Action successfully hit!";
    }
}
