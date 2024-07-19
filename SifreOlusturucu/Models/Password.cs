using System.ComponentModel.DataAnnotations;

namespace SifreOlusturucu.Models
{
    public class Password
    {
        [Required]
        [Range(4, 20, ErrorMessage = "Parola uzunluğu 4 ile 20 karakter arasında olmalıdır")]
        public int Length { get; set; }
        public bool useUpper { get; set; }
        public bool useLower { get; set; }
        public bool useNumber { get; set; }
        public bool useSpecial { get; set; }

        public string GeneratedPassword { get; set; }
        public int SecurityScore { get; set; }

        public Password()
        {
            useUpper = true;
            useLower = true;
            useNumber = true;
            useSpecial = false;
        }

    }
}
