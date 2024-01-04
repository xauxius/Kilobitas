namespace API.Models
{
    public class Sesijos_Perziureta_Preke
    {
        public Guid Id { get; set; }
        public Guid Sesijos_Id { get; set; }
        public Guid Prekes_Id { get; set; }
        public DateTime Perziurejimo_Laikas { get; set; }

        public Sesijos_Perziureta_Preke(Guid sesijos_Id, Guid prekes_Id)
        {
            Id = Guid.NewGuid();
            Sesijos_Id = sesijos_Id;
            Prekes_Id = prekes_Id;
            Perziurejimo_Laikas = DateTime.Now;
        }
    }
}
