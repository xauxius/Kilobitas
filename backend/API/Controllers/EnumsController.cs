using API.Models.DTO;
using API.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnumsController : ControllerBase
    {
        public EnumsController()
        {

        }

        [HttpGet("item-types")]
        public IActionResult GetTypes()
        {
            var Enums = new List<EnumDTO>();

            foreach (int value in Enum.GetValues(typeof(PrekesTipas)))
            {
                string name = Enum.GetName(typeof(PrekesTipas), value);
                Enums.Add(new EnumDTO(value, name.Replace("_", " ")));
            }

            return Ok(Enums);
        }
    }
}
