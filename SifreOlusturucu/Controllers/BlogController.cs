using Microsoft.AspNetCore.Mvc;

namespace SifreOlusturucu.Controllers
{
    public class BlogController : Controller
    {
        public IActionResult EDevletSifreOlusturucu()
        {
            return View();
        }
        public IActionResult GuclutSifreNasilOlusturulur()
        {
            return View();
        }
    }
}
