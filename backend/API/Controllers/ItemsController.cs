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
        private RecommendedService _recommendedService;
        private FileService _fileService;
        private readonly IMapper _mapper;

        public ItemsController(ItemsService itemsService, RecommendedService recommendedService, FileService fileService, IMapper mapper)
        {
            _itemsService = itemsService;
            _recommendedService = recommendedService;
            _fileService = fileService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetCatalogItems()
        {
            return Ok(_itemsService.GetCatalogItems());
        }

        [HttpGet("all")]
        public IActionResult GetAllItems()
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
            _recommendedService.AddRelations(item);

            return Ok(_mapper.Map<PrekeDTO>(item));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteItem(Guid id)
        {
            var item = _itemsService.GetItem(id);
            _recommendedService.RemoveRelations(id);
            _fileService.DeleteFile(item.Paveikslelis);
            _itemsService.DeleteItem(id);
            return Ok();
        }

        [HttpDelete("softdelete/{id}")]
        public IActionResult SoftDeleteItem(Guid id)
        {
            _itemsService.SoftDeleteItem(id);
            return Ok();
        }

        [HttpPost("restore/{id}")]
        public IActionResult RestoreItem(Guid id)
        {
            _itemsService.RestoreItem(id);
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
