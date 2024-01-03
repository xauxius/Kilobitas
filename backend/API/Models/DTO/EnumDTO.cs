namespace API.Models.DTO
{
    public class EnumsDTO 
    {
        public IEnumerable<EnumDTO> Enums { get; set; }

        public EnumsDTO(IEnumerable<EnumDTO> enums) 
        {
            Enums = enums;
        }
    }
    public class EnumDTO
    {
        public int Value { get; set; }
        public string Name { get; set; }

        public EnumDTO(int value, string name) 
        {
            Value = value;
            Name = name;
        }
    }
}
