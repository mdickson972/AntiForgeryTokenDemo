using Microsoft.AspNetCore.Mvc;

namespace AntiForgeryTokenDemo.Controllers
{
    public class CookieController : Controller
    {
        [HttpGet]
        public IActionResult Cookie() => View();

        [HttpGet]
        public IActionResult Generate() => View("Cookie");

        /// <summary>
        /// Receives an Antiforgery Token as part of the form data sent in the request.
        /// Expecting property with ID: __RequestVerificationToken
        /// </summary>
        [HttpPost, AutoValidateAntiforgeryToken]
        public string TestForm() => "Form submission successfull!";

        /// <summary>
        /// Receives an Antiforgery Token as part of the header sent in the request.
        /// Expecting property with ID: X-CSRF-TOKEN
        /// </summary>
        [HttpPost, AutoValidateAntiforgeryToken]
        public string TestApi() => "JSON submission successfull!";
    }    
}
