using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TagsController : ControllerBase
    {
        private readonly TagsService _tagsService;

        public TagsController(TagsService tagsService)
        {
            _tagsService = tagsService;
        }

        [HttpGet("/GetTags")]
        public ActionResult<List<Zyme>> GetAllTags()
        {
            return Ok(_tagsService.GetAllTags());
        }

        [HttpPost("/PostTag")]
        public ActionResult<Zyme> CreateTag([FromBody] Zyme tag)
        {
            _tagsService.CreateTag(tag);
            return CreatedAtAction(nameof(GetTagById), new { id = tag.Id }, tag);
        }

        [HttpGet("/GetTag/{id}")]
        public ActionResult<Zyme> GetTagById(Guid id)
        {
            var tag = _tagsService.GetTagById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }
        [HttpGet("/GetTagByName")]
        public ActionResult<Zyme> GetTagByName(string zymesPavadinimas)
        {
            var tag = _tagsService.GetTagByName(zymesPavadinimas);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }
    }
}
