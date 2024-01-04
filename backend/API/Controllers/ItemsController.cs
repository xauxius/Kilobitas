using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using API.Models.DTO;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private ItemsService _itemsService;
        private readonly IMapper _mapper;

        public ItemsController(ItemsService itemsService, IMapper mapper)
        {
            _itemsService = itemsService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetItems()
        {
            return Ok(_itemsService.GetItems());
        }

        [HttpGet("{id}")]
        public IActionResult GetItem(Guid id)
        {
            var item = _itemsService.GetItem(id);

            return Ok(_mapper.Map<PrekeDTO>(item));
        }

        [HttpPost]
        public IActionResult PostItem(Preke item)
        {
            item.Id = Guid.NewGuid();
            _itemsService.AddItem(item);

            return Ok(_mapper.Map<PrekeDTO>(item));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteItem(Guid id)
        {
            _itemsService.DeleteItem(id);
            return Ok();
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateItem(Guid id, Preke item) 
        {
            _itemsService.UpdateItem(id, item);
            return Ok();
        }
    }
}
