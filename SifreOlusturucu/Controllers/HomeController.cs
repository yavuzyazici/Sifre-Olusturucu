using Microsoft.AspNetCore.Mvc;
using SifreOlusturucu.Models;
using System.Diagnostics;
using System.Reflection;
using System.Text.RegularExpressions;

namespace SifreOlusturucu.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            string passwordS = PasswordGenerate.GeneratePassword(true, true, false, true, 16);
            Password password = new Password()
            {
                Length = 16,
                GeneratedPassword = passwordS,
                SecurityScore = PasswordGenerate.CalculateSecurityScore(16)
            };
            ViewBag.GeneratedPassword = password.GeneratedPassword;
            ViewBag.SecurityScore = password.SecurityScore;

            return View(password);
        }

        [HttpPost]
        public JsonResult GeneratePassword(int length, bool useUpper, bool useLower, bool useNumber, bool useSpecial)
        {
            string generatedPassword = PasswordGenerate.GeneratePassword(useUpper, useLower, useSpecial, useNumber, length);
            int securityScore = PasswordGenerate.CalculateSecurityScore(length);

            var result = new
            {
                GeneratedPassword = generatedPassword,
                SecurityScore = securityScore
            };

            return Json(result);
        }
        public static class PasswordGenerate
        {
            private static string Upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            private static string Numbers = "123456789";
            private static string SpecialChars = "!@#$%^&*()";

            public static string GeneratePassword(bool useUpper, bool useLower, bool useSpecial, bool useNumber, int length)
            {
                Random random = new Random();
                string charSet = string.Empty;
                char[] password = new char[length];


                if (useUpper) charSet += Upper;
                if (useLower) charSet += Upper.ToLower();
                if (useNumber) charSet += Numbers;
                if (useSpecial) charSet += SpecialChars;

                if (charSet.Length == 0)
                {
                    charSet += Upper += Numbers += SpecialChars += Upper.ToLower();
                }

                for (int i = 0; i < length; i++)
                {
                    password[i] = charSet[random.Next(charSet.Length)];
                }




                return string.Join(null, password);
            }

            public static int CalculateSecurityScore(int length)
            {
                int score = 0;
                if (length < 5) score = 1;
                if (length > 4) score = 2;
                if (length > 7) score = 3;
                if (length > 9) score = 4;
                if (length > 11) score = 5;
                return score;
            }
        }
    }
}