using API.Models.Enums;

namespace API.Models
{
    public class Naudotojas
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Phone { get; set; }
        public string BirthDate { get; set; }
        public string Blocked { get; set; }
        public string UserType { get; set; }
    }
}
