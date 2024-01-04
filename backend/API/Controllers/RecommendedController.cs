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

            return Ok(new { session_id = session_id });
        }

        [HttpGet("session")]
        public IActionResult GetSessions()
        {
            var sessions = _recommended_service.GetSessions();

            return Ok(sessions);
        }

        [HttpPost("session/{session_id}/item/{item_id}")]
        public IActionResult SessionView(Guid session_id, Guid item_id)
        {
            _recommended_service.AddViewedItem(session_id, item_id);
            return Ok();
        }

        [HttpGet("viewed/{session_id}")]
        public IActionResult GetSessionViews(Guid session_id)
        {
            return Ok(_recommended_service.GetViewed(session_id));
        }

        [HttpPost]
        public IActionResult UpdateRecommended()
        {
            _recommended_service.UpdateRecommended();
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetRecommended(Guid id)
        {
            return Ok(_recommended_service.GetRecommended(id));
        }

        [HttpPost("recreate")]
        public IActionResult Recreate()
        {
            _recommended_service.RecreateRelations();
            return Ok();
        }
    }
}