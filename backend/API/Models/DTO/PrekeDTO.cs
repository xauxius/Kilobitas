namespace API.Models.DTO
{
    public class PrekeDTO
    {
        public Guid Id { get; set; }
        public double Kaina { get; set; }
        public int Kiekis { get; set; }
        public string Pavadinimas { get; set; }
        public string Aprasymas { get; set; }
        public string Tipas { get; set; }
        public string Paveikslelis { get; set; }
    }
}