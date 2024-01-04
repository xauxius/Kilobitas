using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            // TODO: Replace with actual logic to fetch user from database
            var user = new
            {
                name = "John Doe",
                email = "john.doe@example.com",
                picture = "https://placekitten.com/200/200",
                role = "User"
            };

            return Ok(user);
        }
    }
}