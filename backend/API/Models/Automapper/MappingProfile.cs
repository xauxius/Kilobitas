using AutoMapper;
using API.Models.DTO;

namespace API.Models.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Preke, PrekeDTO>()
                .ForMember(dto => dto.Tipas, opt => opt.MapFrom(src => src.Tipas.ToString().Replace("_", " ")));
        }
    }
}