﻿namespace API.Models
{
    public class Taip_Pat_Domejosi
    {
        public Guid Id { get; set; }
        public Guid PrekesA_Id { get; set; }
        public Guid PrekesB_Id { get; set; }
        public int Kartojimai { get; set; }

        public Taip_Pat_Domejosi(Guid prekes_a_Id, Guid prekes_b_id)
        {
            Id = Guid.NewGuid();
            PrekesA_Id = prekes_a_Id;
            PrekesB_Id = prekes_b_id;
            Kartojimai = 0;
        }
    }
}