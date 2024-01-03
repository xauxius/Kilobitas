namespace API.Models
{
    public class Sesija
    {
        public Guid Id { get; set; }
        public bool Atnaujinta_Rekomendacijose { get; set; }
        public DateTime Sesijos_Pradzia { get; set; }

        public Sesija()
        {
            Id = Guid.NewGuid();
            Atnaujinta_Rekomendacijose = false;
            Sesijos_Pradzia = DateTime.Now;
        }
    }
}
