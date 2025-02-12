using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Automobil : Entitet
    {
        public string Marka { get; set; } = "";

        public string Model { get; set; } = "";

        public string? Motor { get; set; }

        public string? Vin { get; set; } 

        public int? Godiste { get; set; }

        public int? Kilometraza { get; set; }


       
    }
}
