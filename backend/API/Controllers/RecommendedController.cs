using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecommendedController : ControllerBase
    {
        private RecommendedService _recommended_service;

        public RecommendedController(RecommendedService recommended_service)
        {
            _recommended_service = recommended_service;
        }

        [HttpPost("session")]
        public IActionResult StartSession()
        {
            var session_id = _recommended_service.StartSession();

            return Ok(new { Session_Id = session_id });
        }

        [HttpPost("session/{session_id}/item/{item_id}")]
        public IActionResult SessionView(Guid session_id, Guid item_id)
        {
            _recommended_service.AddViewedItem(session_id, item_id);
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetRecommended(Guid id)
        {
            return Ok(_recommended_service.GetRecommended(id));
        }
    }
}
