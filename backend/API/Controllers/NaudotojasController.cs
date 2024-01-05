using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using API.Models.DTO;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NaudotojasController : ControllerBase
    {
        private NaudotojasService _naudotojasService;
        private readonly IMapper _mapper;

        public NaudotojasController(NaudotojasService naudotojasService, IMapper mapper)
        {
            _naudotojasService = naudotojasService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetNaudotojai()
        {
            return Ok(_naudotojasService.GetNaudotojai());
        }

        [HttpGet("{id}")]
        public IActionResult GetNaudotojas(Guid id)
        {
            var naudotojas = _naudotojasService.GetNaudotojas(id);

            return Ok(_mapper.Map<Naudotojas>(naudotojas));
        }

        [HttpPost]
        public IActionResult PostItem(Naudotojas naudotojas)
        {
            naudotojas.Id = Guid.NewGuid();
            _naudotojasService.AddNaudotojas(naudotojas);

            return Ok(_mapper.Map<Naudotojas>(naudotojas));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNaudotojas(Guid id)
        {
            var naudotojas = _naudotojasService.GetNaudotojas(id);
            _naudotojasService.DeleteNaudotojas(id);
            return Ok();
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateNaudotojas(Guid id, Naudotojas naudotojas) 
        {
            _naudotojasService.UpdateNaudotojas(id, naudotojas);
            return Ok();
        }
    }
}
