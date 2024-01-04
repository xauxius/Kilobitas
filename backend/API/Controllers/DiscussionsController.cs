using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DiscussionsController : ControllerBase
    {
        private readonly DiscussionsService _discussionsService;

        public DiscussionsController(DiscussionsService discussionsService)
        {
            _discussionsService = discussionsService;
        }

        [HttpGet("/ListDiscussions")]
        public ActionResult<List<Discussion>> GetDiscussions()
        {
            return Ok(_discussionsService.GetDiscussions());
        }

        [HttpGet("/GetDiscussion/{id}")]
        public ActionResult<Discussion> GetDiscussion(Guid id)
        {
            var discussion = _discussionsService.GetDiscussion(id);
            if (discussion == null)
            {
                return NotFound();
            }
            return Ok(discussion);
        }

        [HttpPost("/PostDiscussion")]
        public ActionResult<Discussion> PostDiscussion(Discussion discussion)
        {
            discussion.Id = Guid.NewGuid();
            _discussionsService.AddDiscussion(discussion);
            return CreatedAtAction(nameof(GetDiscussion), new { id = discussion.Id }, discussion);
        }

        [HttpDelete("/DeleteDiscussion/{id}")]
        public IActionResult DeleteDiscussion(Guid id)
        {
            var discussion = _discussionsService.GetDiscussion(id);
            if (discussion == null)
            {
                return NotFound();
            }
            _discussionsService.DeleteDiscussion(id);
            return NoContent();
        }

        [HttpGet("/ListDiscussionsByCategory/{category}")]
        public ActionResult<List<Discussion>> GetDiscussionsByCategory(string category)
        {
            if (string.IsNullOrEmpty(category))
            {
                return Ok(_discussionsService.GetDiscussions());
            }
            return Ok(_discussionsService.GetDiscussionsByCategory(category));
        }



        [HttpPut("/PutDiscussion/{id}")]
        public IActionResult UpdateDiscussion(Guid id, Discussion discussionToUpdate)
        {
            var discussion = _discussionsService.GetDiscussion(id);
            if (discussion == null)
            {
                return NotFound();
            }
            _discussionsService.UpdateDiscussion(id, discussionToUpdate);
            return NoContent();
        }
    }
}
