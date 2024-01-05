using API.Models.Enums;

namespace API.Models
{
    public class Preke
    {
        public Guid Id { get; set; }
        public double Kaina { get; set; }
        public int Kiekis { get; set; }
        public string Pavadinimas { get; set; }
        public string Aprasymas { get; set; }
        public PrekesTipas Tipas { get; set; }
        public string Paveikslelis { get; set; }
        public bool Rodyti_kataloge { get; set; }
    }
}
